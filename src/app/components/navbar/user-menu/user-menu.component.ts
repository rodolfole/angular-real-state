import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { LoginAction, ModalService } from 'src/app/services/modal.service';
import { SafeUser } from 'src/app/types';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent {

  @Input() currentUser?: SafeUser | null = null;

  rentModal: () => void = () => { };

  isOpen: boolean = false;

  constructor(private modalService: ModalService) { }

  toggleOpen = () => {
    this.isOpen = !this.isOpen;
  }

  onRent = () => {
    if (!this.currentUser) {
      return this.handleloginModal;
    }

    return this.rentModal;
  }

  handleSignOut = () => {

  }

  handleloginModal = (loginModalRef: TemplateRef<HTMLElement> | null) => {
    this.toggleOpen();
    this.modalService.setShowModal({ showModal: true, content: loginModalRef });
  }

}
