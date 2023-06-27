import { NgFor } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { SwiperComponent } from 'src/app/components/swiper/swiper.component';
import { ModalService } from 'src/app/services/modal.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  imports: [SwiperComponent, NgFor],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true
})
export class HeroComponent {

  @Input() heroImages: string[] = [];

  constructor(private modalService: ModalService) { }

  handleClose = () => {
    this.modalService.setShowModal({ showModal: false, content: null });
  }

}
