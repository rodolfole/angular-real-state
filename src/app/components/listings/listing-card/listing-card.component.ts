import { Component, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { SafeListing, SafeReservation, SafeUser } from 'src/app/types';
import { A11y, Mousewheel, Navigation, Pagination, SwiperOptions, Swiper } from 'swiper';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.css']
})
export class ListingCardComponent {

  @ViewChild('listingSwiper', { static: false }) listingSwiper?: ElementRef<HTMLElement>;

  @Input() actionId?: string;
  @Input() actionLabel?: string;
  @Input() data: SafeListing | null = null;
  @Input() disabled?: boolean;
  @Input() onAction?: (id: string) => void;
  @Input() reservation?: SafeReservation;

  location: any = null;
  reservationDate: string | null = null;
  price: string = "";

  swiper: Swiper | null = null;
  sliders: string[] = [];

  config: SwiperOptions = {
    modules: [Navigation, Pagination, A11y, Mousewheel],
    spaceBetween: 20,
    navigation: false,
    pagination: { clickable: true, dynamicBullets: true },
    slidesPerView: 1,
    centeredSlides: true,
    injectStyles: [`
    .swiper-pagination-bullets.swiper-pagination-horizontal {
      bottom: 30px;
    }
    .swiper-pagination-bullet {
      background: white;
    }
    .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next,
    .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev {
      opacity: 0.8;
    }
    .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next,
    .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev {
      opacity: 0.6;
    }
    `],
    breakpoints: {
      400: {
        slidesPerView: "auto",
        centeredSlides: false
      },
    }
  }

  constructor(private detector: ChangeDetectorRef) { 
    this.sliders = [...Array(10).entries()].map((_, i) => `../../../assets/images/${i + 1}.webp`);
  }

  ngOnInit(): void {
    this.getReservationDate();
    this.getPrice();
  }

  ngAfterViewInit(): void {
    this.swiper = (this.listingSwiper?.nativeElement as any).swiper;
    this.detector.detectChanges();
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

    this.price = this.data?.price || "";
  }

  handleCancel(e: MouseEvent) {
    console.log("Hey");
    e.stopPropagation();



    if (this.disabled) {
      return;
    }

    this.onAction?.(this.actionId!);
  }

  handleNextSlide(e: MouseEvent) {
    e.stopPropagation();
    const swiper = this.listingSwiper?.nativeElement as any;
    swiper.swiper.slideNext()
  }

  handlePrevSlide(e: MouseEvent) {
    e.stopPropagation();
    const swiper = this.listingSwiper?.nativeElement as any;
    swiper.swiper.slidePrev()
  }

}
