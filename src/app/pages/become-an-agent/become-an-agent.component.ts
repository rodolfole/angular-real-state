import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BecomeAnAgentFloatingFooterComponent } from 'src/app/components/become-an-agent/become-an-agent-floating-footer/become-an-agent-floating-footer.component';
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
    BecomeAnAgentFloatingFooterComponent,
    RouterModule
  ],
  standalone: true
})
export class BecomeAnAgentComponent {

}
