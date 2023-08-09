import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ListingsService } from 'src/app/services/listings.service';
import { Listing } from 'src/app/types/listing';

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.css']
})
export class MyPropertiesComponent {

  reloadListingsSub$?: Subscription;

  isLoading: boolean = true;
  properties: Listing[] = [];

  constructor(
    private authService: AuthService,
    private listingsService: ListingsService
  ) {
    this.getFavorites();
    this.handleReloadListings();
  }

  ngOnDestroy(): void {
    this.reloadListingsSub$?.unsubscribe();
  }

  getFavorites() {
    const agentId: string = this.authService.getCurrentUser()?.id || "";

    const getAgentPropertiesSub$ = this.listingsService.getAgentProperties(agentId).subscribe((listings) => {
      this.properties = listings;
      this.isLoading = false;
      getAgentPropertiesSub$.unsubscribe();
    });
  }

  handleReloadListings() {
    this.reloadListingsSub$ = this.listingsService.emitReloadListings.subscribe(() => {
      this.getFavorites();
    });
  }

}
