import { Component, Input } from '@angular/core';
import { Listing } from 'src/app/types/listing';

import { IListingsParams, ListingsService } from 'src/app/services/listings.service';

import { listings } from 'src/app/mocks/listings';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @Input() searchParams: IListingsParams = {};

  listings: Listing[] = [];
  isDrawerOpen: boolean = false;

  constructor(
    private listinsgService: ListingsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((param) => {
      this.isDrawerOpen = JSON.parse(param['drawer_open']) || false;
    })
  }

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

  toogleDrawer(e: MouseEvent) {
    e.stopPropagation();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { drawer_open: !this.isDrawerOpen },
      queryParamsHandling: "merge"
    })
  }

}
