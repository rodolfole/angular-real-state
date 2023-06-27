import { Component, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {

  // @Output() getModalAction: EventEmitter<LoginAction> = new EventEmitter<LoginAction>();
  $showModalSub: Subscription | null = null;

  showModal: boolean = false;
  isOpen: boolean = false;
  isExpanded?: boolean;
  content: TemplateRef<any> | null = null;

  documentHtml: HTMLElement | null = null;
  documentBody: HTMLElement | null = null;

  constructor(private modalService: ModalService) {
    this.documentHtml = document.querySelector('html');
    this.documentBody = document.querySelector('body');

    this.$showModalSub = this.modalService
      .getShowModal()
      .subscribe(({ showModal, isExpanded, content, index }) => {

        if (showModal) {
          this.documentHtml?.classList.add('overflow-hidden');
          this.documentBody?.classList.add('overflow-hidden');
        }
        else return this.handleClose();

        this.isOpen = true;
        this.content = content;
        this.showModal = showModal;
        this.isExpanded = isExpanded;
      });
  }

  ngOnDestroy(): void {
    this.documentHtml?.classList.remove('overflow-hidden');
    this.documentBody?.classList.remove('overflow-hidden');
    this.$showModalSub?.unsubscribe();
  }

  handleClose = () => {
    this.showModal = false;
    setTimeout(() => {
      this.isOpen = false;
      this.documentHtml?.classList.remove('overflow-hidden');
      this.documentBody?.classList.remove('overflow-hidden');
    }, 300);
  };

}
