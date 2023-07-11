import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Feature } from 'src/app/services/mapbox.ts.service';

@Component({
  selector: 'app-search-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.css']
})
export class SearchMenuComponent {

  @Input() locations: Feature[] = [];
  @Input() customClasses?: string[] | string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['locations'] && this.locations.length) {
    }
  }


}
