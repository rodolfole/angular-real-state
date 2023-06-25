import { Component, Input, TemplateRef } from '@angular/core';
import { SafeUser } from 'src/app/types';

interface AvatarIcon {
  icon: string,
  border?: boolean,
}

@Component({
  selector: 'app-agent-avatar',
  templateUrl: './agent-avatar.component.html',
  styleUrls: ['./agent-avatar.component.css']
})
export class AgentAvatarComponent {

  @Input() agent?: SafeUser;
  @Input() avatarSize: string = "h-14 w-14";
  @Input() icon?: AvatarIcon;
  @Input() customIcon: TemplateRef<any> | null = null;
  @Input() disabled: boolean = false;
  defaultImage: string = "../../../assets/images/agent.jpg";

  handleClick = () => {

  }

}
