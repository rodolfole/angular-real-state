import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SafeUser } from 'src/app/types';

@Component({
  selector: 'app-heart-button',
  templateUrl: './heart-button.component.html',
  styleUrls: ['./heart-button.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class HeartButtonComponent {

  @Input() listingId: string | null = null;

  currentUser?: SafeUser | null = null;
  hasFavorited: boolean = false;

  constructor(private userService: UserService) {
    this.currentUser = this.userService.user;
  }

  toggleFavorite = (e: MouseEvent) => {
    e.stopPropagation();
    this.hasFavorited = !this.hasFavorited;
  };

}
