import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Navigation, Pagination, A11y, Mousewheel, SwiperOptions, Swiper } from 'swiper';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.css']
})
export class SwiperComponent {

  @ViewChild('swiperRef', { static: false }) swiperRef?: ElementRef<HTMLElement>;

  @Input() innerActions: boolean = true;
  @Input() customClasses: string = "";
  @Input() slidesPerView?: number = 1;
  @Input() showPagination: boolean = true;

  config: SwiperOptions = {}

  swiper: Swiper | null = null;

  constructor(private detector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.config = {
      modules: [Navigation, Pagination, A11y, Mousewheel],
      spaceBetween: 20,
      navigation: false,
      pagination: this.showPagination ? { clickable: true, dynamicBullets: true } : false,
      slidesPerView: "auto",
      watchOverflow: true,
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
      `]
    }
  }

  ngAfterViewInit(): void {
    this.swiper = (this.swiperRef?.nativeElement as any).swiper;
    this.detector.detectChanges();
  }

  handleNextSlide(e: MouseEvent, swipper: HTMLElement) {
    e.stopPropagation();
    const swiper = swipper as any;
    swiper.swiper.slideNext()
  }

  handlePrevSlide(e: MouseEvent, swipper: HTMLElement) {
    e.stopPropagation();
    const swiper = swipper as any;
    swiper.swiper.slidePrev()
  }

}
