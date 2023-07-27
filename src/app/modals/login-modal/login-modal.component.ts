import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LoginAction, ModalService } from '../../services/modal.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { HeadingComponent } from 'src/app/components/heading/heading.component';
import { InputComponent } from 'src/app/components/Inputs/input/input.component';
import { AuthService } from 'src/app/services/auth.service';

export interface LoginDialogData {
  loginAction?: LoginAction;
}

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ButtonComponent,
    HeadingComponent,
    InputComponent,
  ],
  standalone: true,
})
export class LoginModalComponent {
  @Input() data?: LoginDialogData;

  errors: boolean = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modalService: ModalService,
    private authService: AuthService
  ) {
    this.form = this.initForm();
  }

  handleClose = () => {
    this.modalService.toggleModal.emit(false);
  };

  handleSubmit = () => {
    this.form.disable();

    if (this.data?.loginAction === 'Register') {
      this.userService.registerUser(this.form.value).subscribe((resp) => {
        this.handleClose();
      });
    } else {
      this.authService
        .login(this.form.value.email, this.form.value.password)
        .subscribe((resp) => {
          this.handleClose();
        });
    }
  };

  initForm(): FormGroup {
    return this.fb.group({
      name: [{ value: '', disabled: false }],
      email: [
        { value: '', disabled: false },
        [Validators.required, Validators.email],
      ],
      password: [{ value: '', disabled: false }, Validators.required],
    });
  }

  onToggle() {
    // loginModal.onClose();
    // registerModal.onOpen();
  }

  signIn = (action?: string) => {};
}
