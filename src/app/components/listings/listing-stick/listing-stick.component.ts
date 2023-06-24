import { Component, Input } from '@angular/core';
import { Listing } from 'src/app/types/listing';

@Component({
  selector: 'app-listing-stick',
  templateUrl: './listing-stick.component.html',
  styleUrls: ['./listing-stick.component.css']
})
export class ListingStickComponent {

  @Input() listing?: Listing;

}
