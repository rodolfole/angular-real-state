import { ChangeDetectorRef, Component } from '@angular/core';
import { Listing } from 'src/app/types/listing';

import { ListingsService } from 'src/app/services/listings.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  listings: Listing[] = [];
  isDrawerOpen: boolean = false;
  $categoryEmiterSubscription?: Subscription;
  isLoading: boolean = true;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private listinsgService: ListingsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((param) => {
      this.isDrawerOpen = param['drawer_open']
        ? JSON.parse(param['drawer_open'])
        : false;
    });
    this.getListingsByCategory();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.$categoryEmiterSubscription?.unsubscribe();
  }

  toogleDrawer(e: MouseEvent) {
    e.stopPropagation();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { drawer_open: !this.isDrawerOpen },
      queryParamsHandling: 'merge',
    });
  }

  getListingsByCategory() {
    this.$categoryEmiterSubscription =
      this.listinsgService.emitFilterCategory.subscribe(async ({ isLoading, listings }) => {
        if (listings) this.listings = [...listings];
        this.isLoading = isLoading;

        this.changeDetector.detectChanges();
      });
  }
}
