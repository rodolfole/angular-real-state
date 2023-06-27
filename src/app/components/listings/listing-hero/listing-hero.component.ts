import { ChangeDetectorRef, Component, Input, TemplateRef } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-listing-hero',
  templateUrl: './listing-hero.component.html',
  styleUrls: ['./listing-hero.component.css']
})
export class ListingHeroComponent {

  @Input() listingId: string = "";
  @Input() images: string[] = [];

  isOpen: boolean = false;
  heroImagesList: string[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.heroImagesList = [...this.images].reverse().slice(0, 6);
    this.changeDetector.detectChanges();
  }

  toggleOpen = () => {
    this.isOpen = !this.isOpen;
  }

  handleHeroModal = (heroModalRef: TemplateRef<HTMLElement> | null, index?: number) => {
    this.toggleOpen();
    this.modalService.setShowModal({ showModal: true, content: heroModalRef, isExpanded: true });
  }
}
