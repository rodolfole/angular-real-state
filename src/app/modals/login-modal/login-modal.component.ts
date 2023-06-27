import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LoginAction, ModalService } from '../../services/modal.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { HeadingComponent } from 'src/app/components/heading/heading.component';
import { InputComponent } from 'src/app/components/Inputs/input/input.component';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
  imports: [ReactiveFormsModule, CommonModule, ButtonComponent, HeadingComponent, InputComponent],
  standalone: true
})
export class LoginModalComponent {

  isLoading: boolean = false;
  errors: boolean = false;
  @Input() loginAction: () => LoginAction | void = () => { };

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modalService: ModalService
  ) {
    this.form = this.fb.group({
      name: [{ value: "", disabled: false }],
      email: [{ value: "", disabled: false }, [Validators.required, Validators.email]],
      password: [{ value: "", disabled: false }, Validators.required],
    });
  }

  ngOnInit(): void {
    console.log(this.loginAction());

  }

  handleClose = () => {
    this.modalService.setShowModal({ showModal: false, content: null });
  }

  handleSubmit = () => {
    this.form.disable()
    console.log('submit');
    console.log(this.form.value);
    this.userService.registerUser(this.form.value).subscribe(resp => {
      console.log('enviado a service', resp);

    })
  };

  onToggle() {
    // loginModal.onClose();
    // registerModal.onOpen();
  }

  signIn = (action?: string) => {

  };
}
