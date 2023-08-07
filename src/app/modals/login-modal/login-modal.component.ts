import { ChangeDetectorRef, Component, Input } from '@angular/core';
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
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

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

  loginAction: LoginAction = 'Login';
  errors: boolean = false;
  form: FormGroup;
  private tempId = '';
  showRegisterSuccessMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modalService: ModalService,
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.form = this.initForm();
  }

  ngAfterViewInit(): void {
    this.loginAction = this.data!.loginAction!;
    this.changeDetectorRef.detectChanges();
  }

  handleClose = () => {
    this.modalService.toggleModal.emit(false);
  };

  public async googleAuth() {
    const url = this.getGoogleLoginUrl();
    const authWindow = window.open(url, '', 'popup=true');

    if (authWindow) {
      const checkPopupWindow = setInterval(() => {
        if (authWindow.closed) {
          clearInterval(checkPopupWindow);

          if (this.tempId && uuidValidate(this.tempId))
            this.authService.loginGoogle(this.tempId).subscribe((resp) => {});
          this.tempId = '';
        }
      }, 100);
    }
  }

  private getGoogleLoginUrl(): string {
    const state = uuidv4();
    this.tempId = state;
    const googleAuthEndpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    const loginRequestParameters: { [key: string]: string } = {
      response_type: 'code',
      redirect_uri: `http://localhost:3000/api/auth/google/callback`,
      scope: 'email profile',
      client_id:
        '702765054016-4e692e7rjfj2h6q79tbpsq0bi4hd9390.apps.googleusercontent.com',
      state,
    };

    const paramsString = Object.keys(loginRequestParameters)
      .map((key) => `${key}=${encodeURIComponent(loginRequestParameters[key])}`)
      .join('&');

    return `${googleAuthEndpoint}?${paramsString}`;
  }

  handleSubmit = () => {
    this.form.disable();

    if (this.loginAction === 'Register') {
      this.userService.registerUser(this.form.value).subscribe((resp) => {
        this.form = this.initForm();
        this.showRegisterSuccessMessage = true;
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

  handleModalAction(action: LoginAction) {
    this.loginAction = action;
    this.showRegisterSuccessMessage = false;
  }
}
