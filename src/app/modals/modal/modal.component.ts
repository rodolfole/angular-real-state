import { Component, Input, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginAction, ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() actionLabel: string | null = null;
  @Input() body: TemplateRef<any> | null = null;
  @Input() content: TemplateRef<any> | null = null;
  @Input() disabled: boolean | undefined = undefined;
  @Input() footer: TemplateRef<any> | null = null;
  @Input() onSubmit: () => void = () => { };
  @Input() secondaryAction?: () => void = () => { };
  @Input() secondaryActionLabel: string | null = null;
  @Input() title: string | null = null;

  $showModalSub: Subscription | null = null;
  isOpen: boolean = false;
  showModal: boolean = false;
  modalAction: LoginAction | undefined;
  documentBody: HTMLElement | null = null;

  constructor(private modalService: ModalService) {
    this.documentBody = document.querySelector("body");
    this.documentBody?.classList.add("overflow-hidden");

    this.$showModalSub = this.modalService.getShowLoginModal().subscribe(({ showModal, action }) => {
      this.isOpen = showModal;
      this.showModal = showModal;
      this.modalAction = action;
    });
  }

  ngOnDestroy(): void {
    this.documentBody?.classList.remove("overflow-hidden");
    this.$showModalSub?.unsubscribe();
  }

  handleClose = () => {
    if (this.disabled) {
      return;
    }

    this.showModal = false;
    setTimeout(() => {
      this.isOpen = false;
    }, 300);
  }

  handleSubmit = () => {
    if (this.disabled) {
      return;
    }

    this.onSubmit();
  }

  handleSecondaryAction = () => {
    if (this.disabled || !this.secondaryAction) {
      return;
    }

    this.secondaryAction();
  }

}
