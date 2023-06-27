import { Component, Input, TemplateRef } from '@angular/core';
import { SafeListing } from 'src/app/types';
import { ButtonComponent } from '../../button/button.component';
import { ModalService } from 'src/app/services/modal.service';
import { ContactComponent } from 'src/app/modals/contact/contact.component';
import { SafeUserPipe } from 'src/app/pipes/safe-user.pipe';

@Component({
  selector: 'app-floating-footer',
  templateUrl: './floating-footer.component.html',
  styleUrls: ['./floating-footer.component.css'],
  imports: [ButtonComponent, ContactComponent, SafeUserPipe],
  standalone: true
})
export class FloatingFooterComponent {

  @Input() listing?: SafeListing;

  constructor(private modalService: ModalService) { }

  handleClick = (contactModalRef: TemplateRef<HTMLElement> | null) => {
    this.modalService.setShowModal({ showModal: true, autoSize: true, content: contactModalRef });
  }

}
