import { Component, Input } from '@angular/core';
import { SafeListing, SafeReservation, SafeUser } from 'src/app/types';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.css']
})
export class ListingCardComponent {

  @Input() actionId?: string;
  @Input() actionLabel?: string;
  @Input() currentUser?: SafeUser | null;
  @Input() data: SafeListing | null = null;
  @Input() disabled?: boolean;
  @Input() onAction?: (id: string) => void;
  @Input() reservation?: SafeReservation;

  location: any = null;
  reservationDate: string | null = null;
  price: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.getReservationDate();
    this.getPrice();
  }

  getReservationDate() {
    if (!this.reservation) {
      return null;
    }

    const start = new Date(this.reservation.startDate);
    const end = new Date(this.reservation.endDate);

    // return `${format(start, "PP")} - ${format(end, "PP")}`;
    return "";
  }

  getPrice() {

    if (this.reservation) {
      this.price = this.reservation.totalPrice;
    }

    this.price = this.data?.price || 0;
  }

  handleCancel(e: MouseEvent) {
    console.log("Hey");
    e.stopPropagation();
    
    

    if (this.disabled) {
      return;
    }

    this.onAction?.(this.actionId!);
  }

}
