import { Component } from '@angular/core';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent {

  disabled = false;
  isLoading: boolean = false;
  isOpen = false;
  errors: boolean = false;

  handleSubmit = () => {
    console.log('submit');
  };

  onToggle() {
    // loginModal.onClose();
    // registerModal.onOpen();
  }

  signIn = (action: string) => {

  }
}
