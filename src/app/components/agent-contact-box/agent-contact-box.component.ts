import { Component, Input, TemplateRef } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { SafeUser } from 'src/app/types';

@Component({
  selector: 'app-agent-contact-box',
  templateUrl: './agent-contact-box.component.html',
  styleUrls: ['./agent-contact-box.component.css']
})
export class AgentContactBoxComponent {

  @Input() agentInfo?: SafeUser;
  @Input() isSticky: boolean = false;

  constructor(private modalService: ModalService) { }

  handleClick = (contactModalRef: TemplateRef<HTMLElement> | null) => {
    this.modalService.setShowModal({ showModal: true, autoSize: true, content: contactModalRef });
  }
}
