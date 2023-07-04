import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingsService } from 'src/app/services/listings.service';

@Component({
  selector: 'app-category-box',
  templateUrl: './category-box.component.html',
  styleUrls: ['./category-box.component.css']
})
export class CategoryBoxComponent {

  @Input() icon: string | null = null;
  @Input() label: string | null = null;
  @Input() selectedTab?: string;

  params: any = "";

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private listingService: ListingsService
  ) {
    this.route.queryParams.subscribe((param) => {
      this.selectedTab = param['tab_id'] || "House";
      this.fliterByCategory(this.selectedTab!);
    });
  }

  fliterByCategory = (category: string) => {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab_id: category },
      queryParamsHandling: "merge"
    });

    this.listingService.emitFilterCategory.emit(category);
  }

}
