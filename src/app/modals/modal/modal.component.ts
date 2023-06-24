import { Component, Input, TemplateRef } from '@angular/core';


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
  @Input() isOpen: boolean | null = null;
  @Input() onClose: () => void = () => { };
  @Input() onSubmit: () => void = () => { };
  @Input() secondaryAction?: () => void = () => { };
  @Input() secondaryActionLabel: string | null = null;
  @Input() title: string | null = null;

  showModal = true;

  handleClose = () => {
    if (this.disabled) {
      return;
    }

    this.showModal = false;
    setTimeout(() => {
      this.onClose();
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
