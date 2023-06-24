import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-listing-navbar',
  templateUrl: './listing-navbar.component.html',
  styleUrls: ['./listing-navbar.component.css']
})
export class ListingNavbarComponent {

  @Input() show: boolean = false;

  constructor() { }

  handleClick(elementId: string): void {
    const element = document.getElementById(elementId);
    element!.scrollIntoView({ behavior: "smooth" })
  }

}
