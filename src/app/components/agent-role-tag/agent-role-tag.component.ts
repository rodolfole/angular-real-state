import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-agent-role-tag',
  templateUrl: './agent-role-tag.component.html',
  styleUrls: ['./agent-role-tag.component.css']
})
export class AgentRoleTagComponent {

  @Input() icon: string | null = null;
  @Input() role: string | null = null;

}
