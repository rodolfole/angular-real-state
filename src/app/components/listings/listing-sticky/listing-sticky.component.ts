import { Component, Input, TemplateRef } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Listing } from 'src/app/types/listing';

@Component({
  selector: 'app-listing-sticky',
  templateUrl: './listing-sticky.component.html',
  styleUrls: ['./listing-sticky.component.css']
})
export class ListingStickyComponent {

  @Input() listing?: Listing;

  constructor(private modalService: ModalService) { }

  handleClick = (contactModalRef: TemplateRef<HTMLElement> | null) => {
    this.modalService.setShowModal({ showModal: true, autoSize: true, content: contactModalRef });
  }

}
