import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesResponse } from 'src/app/services/cloudinary.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BecomeAnAgentService } from 'src/app/services/become-an-agent.service';

@Component({
  selector: 'app-become-an-agent-photos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './become-an-agent-photos.component.html',
  styleUrls: ['./become-an-agent-photos.component.css']
})
export class BecomeAnAgentPhotosComponent {

  imagesList: FilesResponse[] = [];

  form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private becomeAnAgentService: BecomeAnAgentService) {
    this.form = this.initForm();
    this.becomeAnAgentService.emitFilterCategory.emit({ formGroupRef: this.form, stepRoute: 'photos' });
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      images: [
        {
          value: "",
          disabled: false
        },
      ],
    });
  }

}
