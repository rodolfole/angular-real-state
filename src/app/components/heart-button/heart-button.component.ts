import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SafeUser } from 'src/app/types';

@Component({
  selector: 'app-heart-button',
  templateUrl: './heart-button.component.html',
  styleUrls: ['./heart-button.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class HeartButtonComponent {
  @Input() listingId: string | null = null;

  currentUser?: SafeUser | null = null;
  hasFavorited: boolean = false;

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser();
  }

  toggleFavorite = (e: MouseEvent) => {
    e.stopPropagation();
    this.hasFavorited = !this.hasFavorited;
  };
}
