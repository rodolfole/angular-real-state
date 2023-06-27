import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextareaComponent } from 'src/app/components/Inputs/textarea/textarea.component';
import { AgentAvatarComponent } from 'src/app/components/agent-avatar/agent-avatar.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { HeadingComponent } from 'src/app/components/heading/heading.component';
import { ModalService } from 'src/app/services/modal.service';
import { SafeUser } from 'src/app/types';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  imports: [ReactiveFormsModule, CommonModule, ButtonComponent, HeadingComponent, TextareaComponent, AgentAvatarComponent],
  standalone: true
})
export class ContactComponent {

  @Input() agent?: SafeUser;

  isLoading: boolean = false;
  errors: boolean = false;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService
  ) {
    this.form = this.fb.group({
      message: [{ value: "", disabled: false }, Validators.required],
    });
  }

  handleClose = () => {
    this.modalService.setShowModal({ showModal: false, content: null });
  }

  handleSubmit = () => {
    this.form.disable();
  };
}
