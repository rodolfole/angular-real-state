import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { SafeListing } from 'src/app/types';
import { HeartButtonComponent } from '../../heart-button/heart-button.component';
import { SwiperComponent } from '../../swiper/swiper.component';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.css'],
  imports: [
    CommonModule,
    HeartButtonComponent,
    SwiperComponent,
    RouterModule,
    NgIf,
    NgFor,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
})
export class ListingCardComponent {
  @Input() actionId?: string;
  @Input() actionLabel?: string;
  @Input() data: SafeListing | null = null;
  @Input() disabled?: boolean;
  @Input() onAction?: (id: string) => void;
  @Input() showFavoritesBtn: boolean = true;
  @Input() showSwiper: boolean = true;
  @Input() showDetails: boolean = true;

  price: string = '';

  constructor() {}

  ngOnInit(): void {
    this.price = this.data?.price || '';
  }

  handleCancel(e: MouseEvent) {
    e.stopPropagation();

    if (this.disabled) {
      return;
    }

    this.onAction?.(this.actionId!);
  }
}
