import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from '../../container/container.component';
import { Router } from '@angular/router';
import { BecomeAnAgentService } from 'src/app/services/become-an-agent.service';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { StepRoute } from 'src/app/pages/become-an-agent/become-an-agent.component';
import { SteperPipe } from 'src/app/pipes/steper.pipe';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-become-an-agent-floating-footer',
  standalone: true,
  imports: [CommonModule, ContainerComponent, SteperPipe],
  templateUrl: './become-an-agent-floating-footer.component.html',
  styleUrls: ['./become-an-agent-floating-footer.component.css']
})
export class BecomeAnAgentFloatingFooterComponent {

  @Input() stepsRoutes: StepRoute[] = [];

  formSubscription$?: Subscription;
  becomeAnAgentServiceSub$?: Subscription;
  routerEventsSubscription$?: Subscription;

  isFormValid: boolean = false;
  currentRoute: string = "";

  constructor(
    private router: Router,
    private becomeAnAgentService: BecomeAnAgentService,
    private cookieService: CookieService
  ) {
    this.checkCurrentStep();
    this.checkFormsValidity();
  }

  ngOnDestroy(): void {
    this.becomeAnAgentServiceSub$?.unsubscribe();
    this.routerEventsSubscription$?.unsubscribe();
  }

  checkCurrentStep() {
    const currentRoute = this.getCurrentRoute();
    this.cookieService.get(this.currentRoute);
  }

  checkFormsValidity() {
    this.becomeAnAgentServiceSub$ = this.becomeAnAgentService.emitFilterCategory.subscribe(
      ({ formGroupRef, stepRoute, isStepIntro }) => {

        this.currentRoute = this.getCurrentRoute();

        // Save active route step into a the cookie "active-route"
        this.cookieService.set('active-route', this.currentRoute);

        if (isStepIntro || (this.currentRoute === stepRoute && formGroupRef?.valid)) this.isFormValid = true;
        else this.isFormValid = false;

        // Return If "formGroupRef" is undefined
        if (!formGroupRef || !stepRoute) return;

        // Unsubscribe any possible subscription in "formSubscription$" before resubscribing to incoming one
        this.formSubscription$?.unsubscribe();
        this.handleFormChanges(formGroupRef, stepRoute);
      }
    );
  }

  getCurrentRoute(): string {
    const currentRoute = this.router.url.split('become-an-agent/')[1] || 'about-your-home';
    return currentRoute;
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

        this.cookieService.set(this.currentRoute, JSON.stringify(form));

      });
  }

}
