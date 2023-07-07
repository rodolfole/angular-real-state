import { Component, Input, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { SafeUser } from 'src/app/types';

@Component({
  selector: 'app-agent-contact-box',
  templateUrl: './agent-contact-box.component.html',
  styleUrls: ['./agent-contact-box.component.css'],
})
export class AgentContactBoxComponent {
  @Input() agentInfo?: SafeUser;
  @Input() isSticky: boolean = false;

  constructor(
    private modalService: ModalService,
    private authService: AuthService
  ) {}

  handleClick = (
    contactModalRef: TemplateRef<HTMLElement> | null,
    loginModalRef: TemplateRef<HTMLElement> | null
  ) => {
    const isLoggedIn = !!this.authService.getCurrentUser();

    this.modalService.setShowModal({
      showModal: true,
      autoSize: true,
      content: isLoggedIn ? contactModalRef : loginModalRef,
    });
  };
}
