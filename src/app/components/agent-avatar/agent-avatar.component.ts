import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-agent-avatar',
  templateUrl: './agent-avatar.component.html',
  styleUrls: ['./agent-avatar.component.css']
})
export class AgentAvatarComponent {

  @Input() image?: string = "../../../assets/images/placeholder.jpg";
  @Input() avatarSize: string = "h-14 w-14";
  @Input() medalColor?: string;

}
