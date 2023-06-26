import { Component, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginAction, ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {

  // @Output() getModalAction: EventEmitter<LoginAction> = new EventEmitter<LoginAction>();
  $showModalSub: Subscription | null = null;

  showModal: boolean = false;
  isExpanded?: boolean;
  content: TemplateRef<any> | null = null;

  documentBody: HTMLElement | null = null;

  constructor(private modalService: ModalService) {
    this.documentBody = document.querySelector('body');

    this.$showModalSub = this.modalService
      .getShowModal()
      .subscribe(({ showModal, isExpanded, content }) => {
        if (showModal) this.documentBody?.classList.add('overflow-hidden');
        this.showModal = showModal;
        this.isExpanded = isExpanded;
        this.content = content;
      });
  }

  ngOnDestroy(): void {
    this.documentBody?.classList.remove('overflow-hidden');
    this.$showModalSub?.unsubscribe();
  }

  handleClose = () => {
    this.showModal = false;
    setTimeout(() => {
      this.showModal = false;
      this.documentBody?.classList.remove('overflow-hidden');
    }, 300);
  };

}
