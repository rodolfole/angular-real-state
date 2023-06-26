import { Component, Input } from '@angular/core';
import { Listing } from 'src/app/types/listing';

@Component({
  selector: 'app-listing-sticky',
  templateUrl: './listing-sticky.component.html',
  styleUrls: ['./listing-sticky.component.css']
})
export class ListingStickyComponent {

  @Input() listing?: Listing;

}
