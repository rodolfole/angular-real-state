import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadResponse } from 'src/app/services/cloudinary.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BecomeAnAgentService } from 'src/app/services/become-an-agent.service';
import { DragAndDropZoneComponent } from '../../drag-and-drop-zone/drag-and-drop-zone.component';

@Component({
  selector: 'app-become-an-agent-photos',
  standalone: true,
  imports: [CommonModule, DragAndDropZoneComponent],
  templateUrl: './become-an-agent-photos.component.html',
  styleUrls: ['./become-an-agent-photos.component.css']
})
export class BecomeAnAgentPhotosComponent {

  imagesList: UploadResponse[] = [];

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
