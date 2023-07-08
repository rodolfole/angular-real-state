import { Component, Input } from '@angular/core';
import { ListingsService } from 'src/app/services/listings.service';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.css']
})
export class EmptyStateComponent {

  @Input() subtitle?: string = "Try changing or removing some of your filters.";
  @Input() title?: string = "No exact matches";

  constructor(private listingService: ListingsService) { }

  handleResetCategories = () => {
    this.listingService.filterListingsByCategory('House');
  }

}
