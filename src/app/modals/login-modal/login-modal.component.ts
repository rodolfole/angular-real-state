import { Component, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent {
  disabled = false;
  isOpen = false;
  errors: boolean = false;

  // router = useRouter();
  // loginModal = useLoginModal();
  // registerModal = useRegisterModal();
  isLoading: boolean = false;

  handleClose = () => {
    console.log('cerrrrr');
  };

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
