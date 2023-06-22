import { Component, Input } from '@angular/core';
import { SafeUser } from 'src/app/types';

@Component({
  selector: 'app-heart-button',
  templateUrl: './heart-button.component.html',
  styleUrls: ['./heart-button.component.css']
})
export class HeartButtonComponent {

  @Input() listingId: string | null = null;
  @Input() currentUser?: SafeUser | null = null;

  hasFavorited: boolean = false;

  toggleFavorite = () => {
    this.hasFavorited = !this.hasFavorited;
  };

}
