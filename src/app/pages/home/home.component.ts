import { Component, Input } from '@angular/core';
import { Listing } from 'src/app/types/listing';
import { SafeUser } from 'src/app/types';

import { IListingsParams, ListingsService } from 'src/app/services/listings.service';
import { UserService } from 'src/app/services/user.service';

import { listings } from 'src/app/mocks/listings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @Input() searchParams: IListingsParams = {};

  listings: Listing[] = [];
  currentUser: SafeUser | null = null;

  constructor(
    private listinsgService: ListingsService,
    private userService: UserService
  ) { 

  }

  ngOnInit(): void {
    this.listings = listings;
    // this.getListings();
    // this.getCurrentUser();
  }

  getListings() {
    const getListingsSub = this.listinsgService.getListings(this.searchParams).subscribe((listings) => {
      this.listings = listings;

      getListingsSub.unsubscribe();
    })
  }

  getCurrentUser() {
    const getCurrentUserSub = this.userService.getCurrentUser().subscribe((currentUser) => {
      this.currentUser = currentUser;

      getCurrentUserSub.unsubscribe();
    })
  }
}
