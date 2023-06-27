import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { listings } from 'src/app/mocks/listings';
import { Listing } from 'src/app/types/listing';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent {

  @ViewChild('listingInfo', { static: false }) listingInfoSection?: ElementRef<HTMLDivElement>;


  listingId: string = "";
  listing?: Listing;
  listingImages: string[] = [];
  showListingNavbar: boolean = false;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(async (param) => {
      this.listingId = param['id'];
    });

    this.listingImages = [...Array(10).entries()].map((_, i) => `assets/images/${i + 1}.webp`);
    this.listing = listings[0];

  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {

    const listingInfoSectionElement = this.listingInfoSection?.nativeElement;

    if (!listingInfoSectionElement) return;

    if (window.scrollY >= listingInfoSectionElement.offsetTop) { this.showListingNavbar = true; }
    else { this.showListingNavbar = false; }

  }

}
