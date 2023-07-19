import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BecomeAnAgentFloatingFooterComponent } from 'src/app/components/become-an-agent/become-an-agent-floating-footer/become-an-agent-floating-footer.component';
import { BecomeAnAgentNavbarComponent } from 'src/app/components/become-an-agent/become-an-agent-navbar/become-an-agent-navbar.component';
import { ContainerComponent } from 'src/app/components/container/container.component';

export interface StepRoute {
  stepRoute: string;
  isStepIntro?: boolean;
}

@Component({
  selector: 'app-become-an-agent',
  templateUrl: './become-an-agent.component.html',
  styleUrls: ['./become-an-agent.component.css'],
  imports: [
    CommonModule,
    ContainerComponent,
    BecomeAnAgentNavbarComponent,
    BecomeAnAgentFloatingFooterComponent,
    RouterModule
  ],
  standalone: true
})
export class BecomeAnAgentComponent {

  stepsRoutes: StepRoute[] = [
    {
      stepRoute: 'about-your-home',
      isStepIntro: true
    },
    {
      stepRoute: 'structure'
    },
    {
      stepRoute: 'location'
    },
    {
      stepRoute: 'features'
    },
    {
      stepRoute: 'stand-out',
      isStepIntro: true
    },
    {
      stepRoute: 'amenities'
    },
    {
      stepRoute: 'photos'
    },
    {
      stepRoute: 'title'
    },
    {
      stepRoute: 'description'
    },
    {
      stepRoute: 'finish-setup',
      isStepIntro: true
    },
    {
      stepRoute: 'price'
    },
    {
      stepRoute: 'receipt'
    }
  ]

}
