import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from '../../container/container.component';
import { NavigationEnd, Router } from '@angular/router';
import { BecomeAnAgentService } from 'src/app/services/become-an-agent.service';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-become-an-agent-floating-footer',
  standalone: true,
  imports: [CommonModule, ContainerComponent],
  templateUrl: './become-an-agent-floating-footer.component.html',
  styleUrls: ['./become-an-agent-floating-footer.component.css']
})
export class BecomeAnAgentFloatingFooterComponent {

  formSubscription$?: Subscription;
  becomeAnAgentServiceSub$?: Subscription;
  routerEventsSubscription$?: Subscription;

  stepsRoutes = [
    'about-your-home',
    'structure',
    'location',
    'features',
    'stand-out',
    'amenities',
    'photos',
    'title',
    'description',
    'finish-setup',
    'price',
    'receipt',
    'publish'
  ]

  isFormValid: boolean = false;
  currentRoute: string = "";

  constructor(private router: Router, private becomeAnAgentService: BecomeAnAgentService) {
    this.checkFormsValidity();
  }

  ngOnDestroy(): void {
    this.becomeAnAgentServiceSub$?.unsubscribe();
    this.routerEventsSubscription$?.unsubscribe();
  }

  checkFormsValidity() {
    this.becomeAnAgentServiceSub$ = this.becomeAnAgentService.emitFilterCategory.subscribe(
      ({ formGroupRef, stepRoute, isStepIntro }) => {

        this.currentRoute = this.router.url.split('become-an-agent/')[1] || 'about-your-home';

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

  handleStep(isNext: boolean) {
    const currentRouteIndex = this.stepsRoutes.findIndex(elem => elem === this.currentRoute);
    const stepRoute = isNext ? this.stepsRoutes[currentRouteIndex + 1] : this.stepsRoutes[currentRouteIndex + -1];
    this.router.navigate([`/become-an-agent/${stepRoute}`]);
  }

  handleFormChanges(form: FormGroup, stepRoute: string) {
    this.formSubscription$ =
      form.valueChanges.pipe(
        distinctUntilChanged()
      ).subscribe(() => {
        if (this.currentRoute === stepRoute && form.valid) this.isFormValid = true;
        else this.isFormValid = false;
      });
  }

}
