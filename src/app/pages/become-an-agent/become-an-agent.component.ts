import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BecomeAnAgentNavbarComponent } from 'src/app/components/become-an-agent/become-an-agent-navbar/become-an-agent-navbar.component';
import { ContainerComponent } from 'src/app/components/container/container.component';

@Component({
  selector: 'app-become-an-agent',
  templateUrl: './become-an-agent.component.html',
  styleUrls: ['./become-an-agent.component.css'],
  imports: [
    CommonModule,
    ContainerComponent,
    BecomeAnAgentNavbarComponent,
    RouterModule
  ],
  standalone: true
})
export class BecomeAnAgentComponent {

}