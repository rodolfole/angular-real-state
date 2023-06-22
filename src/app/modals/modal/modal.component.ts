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
  @Input() disabled: boolean | null = null;
  @Input() footer: HTMLDivElement | null = null;
  @Input() isOpen: boolean | null = null;
  @Input() onClose: () => void = () => {};
  @Input() onSubmit: () => void = () => {};
  @Input() secondaryAction: () => void = () => {};
  @Input() secondaryActionLabel: string | null = null;
  @Input() title: string | null = null;

  showModal = true;
  
}
