import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BecomeAnAgentService } from 'src/app/services/become-an-agent.service';
import { StepRoute, stepsRoutes } from 'src/app/mocks/steps';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-become-an-agent-receipt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './become-an-agent-receipt.component.html',
  styleUrls: ['./become-an-agent-receipt.component.css']
})
export class BecomeAnAgentReceiptComponent {

  stepsRoutes: StepRoute[] = stepsRoutes;

  constructor(
    private becomeAnAgentService: BecomeAnAgentService,
    private cookieService: CookieService
  ) {
    this.becomeAnAgentService.emitFilterCategory.emit({ isLastStep: true, stepRoute: "receipt" });
    this.getStepperData();
  }

  // Get data from all steps
  getStepperData() {
    const stepperData = this.stepsRoutes.map(step => {

      if (step.isStepIntro) return null;

      const stepData = this.cookieService.get(step.stepRoute);

      const parsedData = stepData ? JSON.parse(stepData) : null

      return parsedData;
    }).filter(elem => elem);

    console.log(stepperData);

  }
}
