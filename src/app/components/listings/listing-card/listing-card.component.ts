import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { SafeListing } from 'src/app/types';
import { HeartButtonComponent } from '../../heart-button/heart-button.component';
import { SwiperComponent } from '../../swiper/swiper.component';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { DropdownComponent, MenuOptions } from '../../dropdown/dropdown.component';
import { ListingsService } from 'src/app/services/listings.service';

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
    DropdownComponent
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
  @Input() showActions: boolean = false;
  @Input() emitReloadListings: boolean = false;

  price: string = '';

  constructor(
    private readonly authService: AuthService,
    private listingService: ListingsService
  ) { }

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

  isLoggedIn(): boolean {
    return !!this.authService.getCurrentUser();
  }

  getMenuOptions(): MenuOptions {
    const listing = this.data!;

    return {
      menuItems: [
        {
          label: "Editar",
          icon: "fal fa-edit",
          click: () => this.handleUpdateListing(listing)
        },
        {
          label: "Eliminar",
          icon: "fal fa-trash",
          click: () => this.handleDeleteListing(listing)
        }
      ]
    }
  }

  async handleUpdateListing(listing: SafeListing) {
    console.log(listing);
  }

  async handleDeleteListing(listing: SafeListing) {
    console.log(listing);

    // const deleteListingSub$ = this.listingService.deleteUserTemporarily(user._id!).subscribe(() => {
    //   this.listingService.emitReloadListings.emit();
    //   deleteListingSub$.unsubscribe();
    // });
  }

}
