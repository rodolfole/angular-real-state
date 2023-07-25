import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from '../../container/container.component';
import { Router } from '@angular/router';
import { BecomeAnAgentService } from 'src/app/services/become-an-agent.service';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { StepRoute, stepsRoutes } from 'src/app/mocks/steps';
import { SteperPipe } from 'src/app/pipes/steper.pipe';
import { CookieService } from 'ngx-cookie-service';

interface CurrentStepValifity {
  isValid: boolean;
  formData?: {
    [key: string]: any;
  }
}

@Component({
  selector: 'app-become-an-agent-floating-footer',
  standalone: true,
  imports: [CommonModule, ContainerComponent, SteperPipe],
  templateUrl: './become-an-agent-floating-footer.component.html',
  styleUrls: ['./become-an-agent-floating-footer.component.css']
})
export class BecomeAnAgentFloatingFooterComponent {
  
  formSubscription$?: Subscription;
  becomeAnAgentServiceSub$?: Subscription;
  routerEventsSubscription$?: Subscription;
  
  stepsRoutes: StepRoute[] = stepsRoutes;
  isFormValid: boolean = false;
  currentRoute: string = "";

  constructor(
    private router: Router,
    private becomeAnAgentService: BecomeAnAgentService,
    private cookieService: CookieService
  ) {
    this.checkFormsValidity();
  }

  ngOnDestroy(): void {
    this.becomeAnAgentServiceSub$?.unsubscribe();
    this.routerEventsSubscription$?.unsubscribe();
  }

  checkCurrentStepValidity(): CurrentStepValifity {

    const currentRouteIndex = this.stepsRoutes.findIndex(elem => elem.stepRoute === this.currentRoute);

    // Check if current step is the first one
    if (currentRouteIndex === 0) return { isValid: true };

    const currentStepFormData = this.cookieService.get(this.currentRoute);

    // Check if current step is valid 
    if (currentStepFormData) {
      return this.getValidStepDataFromCookie(currentStepFormData);
    }

    const { stepRoute } = this.stepsRoutes[currentRouteIndex - 1];
    const isPreviousStepValid = this.cookieService.get(stepRoute);

    // Check if the previous step is valid to allow "Next" button functionallity
    if (isPreviousStepValid) {
      return this.getValidStepDataFromCookie(currentStepFormData);
    }

    const auxStepRoutes: StepRoute[] = [...this.stepsRoutes];

    // Iterate over the "stepsRoutes" array to find the last step completed 
    const lastStepCompleted = auxStepRoutes.reverse().find(step => this.cookieService.get(step.stepRoute));

    this.router.navigate([`/become-an-agent/${lastStepCompleted!.stepRoute}`]);

    return { isValid: false }
  }

  checkFormsValidity() {
    this.becomeAnAgentServiceSub$ = this.becomeAnAgentService.emitFilterCategory.subscribe(
      async ({ formGroupRef, stepRoute, isStepIntro }) => {

        this.currentRoute = stepRoute!;

        // Await 100 milliseconds to ensure "stepsRoutes" var is inited
        await new Promise(resolve => setTimeout(resolve, 100));

        const { isValid, formData } = this.checkCurrentStepValidity();

        if (!isValid) return;

        // Save active route step into a the cookie "active-route"       
        this.cookieService.set('active-route', stepRoute!);

        // Patch "formGroupRef" with saved data in cookie if exists
        if (formData && !formData["isStepIntro"]) formGroupRef?.patchValue(formData);

        if (isStepIntro || (this.currentRoute === stepRoute && formGroupRef?.valid)) {
          this.isFormValid = true;
          this.cookieService.set(this.currentRoute, isStepIntro ? JSON.stringify({ isStepIntro: true }) : JSON.stringify(formGroupRef?.value));
        }
        else this.isFormValid = false;

        // Return If "formGroupRef" is undefined
        if (!formGroupRef || !stepRoute) return;

        // Unsubscribe any possible subscription in "formSubscription$" before resubscribing to incoming one
        this.formSubscription$?.unsubscribe();
        this.handleFormChanges(formGroupRef, stepRoute);
      }
    );
  }

  getValidStepDataFromCookie(currentStepFormData: string): CurrentStepValifity {
    return { isValid: true, formData: currentStepFormData ? JSON.parse(currentStepFormData) : null };
  }

  handleStep(isNext: boolean) {
    const currentRouteIndex = this.stepsRoutes.findIndex(elem => elem.stepRoute === this.currentRoute);
    const stepRoute = isNext ? this.stepsRoutes[currentRouteIndex + 1].stepRoute : this.stepsRoutes[currentRouteIndex + -1].stepRoute;
    this.router.navigate([`/become-an-agent/${stepRoute}`]);
  }

  handleFormChanges(form: FormGroup, stepRoute: string) {
    this.formSubscription$ =
      form.valueChanges.pipe(
        distinctUntilChanged()
      ).subscribe(() => {
        if (this.currentRoute === stepRoute && form.valid) this.isFormValid = true;
        else this.isFormValid = false;

        if (form.valid) this.cookieService.set(this.currentRoute, JSON.stringify(form.value));

      });
  }

}
