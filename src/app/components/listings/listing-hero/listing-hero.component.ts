import { ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-listing-hero',
  templateUrl: './listing-hero.component.html',
  styleUrls: ['./listing-hero.component.css']
})
export class ListingHeroComponent {

  @Input() listingId: string = "";
  @Input() images: string[] = [];
  heroImagesList: string[] = [];

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.heroImagesList = [...this.images].reverse().slice(0, 6);
    this.changeDetector.detectChanges();
  }
}
