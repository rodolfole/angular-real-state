import { Component, Input } from '@angular/core';
import { SafeUser } from 'src/app/types';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent {

  @Input() currentUser?: SafeUser | null = null;

  registerModal: () => void = () => { };
  loginModal: () => void = () => { };
  rentModal: () => void = () => { };

  isOpen: boolean = false;

  toggleOpen = () => {
    this.isOpen = !this.isOpen;
  }

  onRent = () => {
    if (!this.currentUser) {
      return this.loginModal;
    }

    return this.rentModal;
  }

  handleSignOut = () => {

  }

}
