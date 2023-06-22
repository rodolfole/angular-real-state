import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { ComponentsModule } from '../components/components.module';

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
    CommonModule,
    ComponentsModule
  ]
})
export class ModalsModule { }
