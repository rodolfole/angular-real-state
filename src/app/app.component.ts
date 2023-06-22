import { Component } from '@angular/core';
import { SafeUser } from './types';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentUser: SafeUser | null = null;

  constructor(
    private userService: UserService
  ) { }

  getCurrentUser() {
    const getCurrentUserSub = this.userService.getCurrentUser().subscribe((currentUser) => {
      this.currentUser = currentUser;

      getCurrentUserSub.unsubscribe();
    })
  }

}
