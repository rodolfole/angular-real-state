import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ModalComponent,
    RegisterModalComponent
  ],
  exports: [
    ModalComponent,
    RegisterModalComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ModalsModule { }
