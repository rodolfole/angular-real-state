import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloudinaryService, UploadResponse } from 'src/app/services/cloudinary.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BecomeAnAgentService } from 'src/app/services/become-an-agent.service';
import { DragAndDropZoneComponent } from '../../drag-and-drop-zone/drag-and-drop-zone.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-become-an-agent-photos',
  standalone: true,
  imports: [CommonModule, DragAndDropZoneComponent],
  templateUrl: './become-an-agent-photos.component.html',
  styleUrls: ['./become-an-agent-photos.component.css']
})
export class BecomeAnAgentPhotosComponent {

  getSelectedFilesSub$?: Subscription;

  imagesList: UploadResponse[] = [];
  form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private becomeAnAgentService: BecomeAnAgentService,
    private cloudinaryService: CloudinaryService
  ) {
    this.form = this.initForm();
    this.becomeAnAgentService.emitFilterCategory.emit({ formGroupRef: this.form, stepRoute: 'photos' });
    this.getSelectedFiles();
  }

  ngOnDestroy(): void {
    this.getSelectedFilesSub$?.unsubscribe();
  }

  getSelectedFiles() {
    this.getSelectedFilesSub$ = this.cloudinaryService.emitSelectedFiles.subscribe((files) => {
      this.form.setValue({
        images: files.map(file => ({ url: file.file?.url, public_id: file.file?.public_id }))
      });
    });
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      images: [
        {
          value: null,
          disabled: false
        },
        Validators.required
      ],
    });
  }

}
