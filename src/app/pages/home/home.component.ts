import { Component, Input } from '@angular/core';
import { Listing } from 'src/app/types/listing';

import { IListingsParams, ListingsService } from 'src/app/services/listings.service';

import { listings } from 'src/app/mocks/listings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @Input() searchParams: IListingsParams = {};

  listings: Listing[] = [];

  constructor(
    private listinsgService: ListingsService
  ) { }

  ngOnInit(): void {
    this.listings = listings;
    // this.getListings();
  }

  getListings() {
    const getListingsSub = this.listinsgService.getListings(this.searchParams).subscribe((listings) => {
      this.listings = listings;

      getListingsSub.unsubscribe();
    })
  }
}
