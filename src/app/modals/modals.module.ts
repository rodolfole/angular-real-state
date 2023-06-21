import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';



@NgModule({
  declarations: [
    ModalComponent,
    LoginModalComponent,
    RegisterModalComponent
  ],
  exports: [
    ModalComponent,
    LoginModalComponent,
    RegisterModalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalsModule { }
