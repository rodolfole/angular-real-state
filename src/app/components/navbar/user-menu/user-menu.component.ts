import { Component, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoginAction, ModalService } from 'src/app/services/modal.service';
import { SafeUser } from 'src/app/types';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
})
export class UserMenuComponent {
  userFromEmitterSubscription$?: Subscription;
  currentUser?: SafeUser | null = null;
  isOpen: boolean = false;
  loginAction: LoginAction = 'Login';

  constructor(
    private modalService: ModalService,
    private authService: AuthService
  ) {
    this.getCurrentUser();
    this.getUserFromEmitter();
  }

  ngOnDestroy(): void {
    this.userFromEmitterSubscription$?.unsubscribe();
  }

  toggleOpen = () => {
    this.isOpen = !this.isOpen;
  };

  onSell = () => {};

  handleSignOut = () => {
    this.authService.logout();
  };

  handleloginModal = (
    loginModalRef: TemplateRef<HTMLElement> | null,
    loginAction: LoginAction
  ) => {
    this.toggleOpen();
    this.loginAction = loginAction;
    this.modalService.setShowModal({ showModal: true, content: loginModalRef });
  };

  getLoginAction = (): LoginAction => {
    return this.loginAction;
  };

  getCurrentUser() {
    const user = this.authService.getCurrentUser();
    this.currentUser = user;
  }

  getUserFromEmitter() {
    this.userFromEmitterSubscription$ = this.authService.userEmitter.subscribe(
      (user) => {
        this.currentUser = user;
      }
    );
  }
}
