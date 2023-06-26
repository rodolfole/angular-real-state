import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LoginAction } from '../../services/modal.service';

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
  modalAction: LoginAction | undefined;

  form: FormGroup;

  constructor(private fb: FormBuilder, private _userS: UserService) {
    this.form = this.fb.group({
      name: [{value: "", disabled: false}],
      email: [{value: "", disabled: false}, [Validators.required, Validators.email]],
      password: [{value: "", disabled: false}, Validators.required],
    });
  }

  handleSubmit = () => {
    this.form.disable()
    console.log('submit');
    console.log(this.form.value);
    this._userS.registerUser(this.form.value).subscribe(resp => {
      console.log('enviado a service', resp);
      
    })
  };

  onToggle() {
    // loginModal.onClose();
    // registerModal.onOpen();
  }

  signIn = (action?: string) => {
    
  };

  getModalAction = (modalAction: LoginAction) => {
    this.modalAction = modalAction
    console.log(this.modalAction);
    
  }
}
