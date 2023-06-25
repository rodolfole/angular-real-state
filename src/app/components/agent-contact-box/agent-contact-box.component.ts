import { Component, Input } from '@angular/core';
import { SafeUser } from 'src/app/types';

@Component({
  selector: 'app-agent-contact-box',
  templateUrl: './agent-contact-box.component.html',
  styleUrls: ['./agent-contact-box.component.css']
})
export class AgentContactBoxComponent {

  @Input() agentInfo: SafeUser | null = null;
  @Input() isSticky: boolean = false;

}
