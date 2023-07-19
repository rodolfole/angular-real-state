import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneChangeEvent, NgxDropzoneModule } from 'ngx-dropzone';
import { AddedFiles, CloudinaryService, ResourceType } from 'src/app/services/cloudinary.service';
import { Subscription } from 'rxjs';
import { ImagePreviewPipe } from 'src/app/pipes/image-preview.pipe';
import { ProgressLoaderComponent } from '../progress-loader/progress-loader.component';
import { FormGroup } from '@angular/forms';

export enum AcceptedFiles {
  all = "*",
  images = "image/jpeg,image/jpg,image/png,image/webp,image/svg",
  documents = "application/pdf,application/doc,application/docx",
  video = "video/mp4,video/x-m4v,video/*"
}

@Component({
  selector: 'app-drag-and-drop-zone',
  standalone: true,
  imports: [CommonModule, NgxDropzoneModule, ImagePreviewPipe, ProgressLoaderComponent],
  templateUrl: './drag-and-drop-zone.component.html',
  styleUrls: ['./drag-and-drop-zone.component.css']
})
export class DragAndDropZoneComponent {

  uploadFilesSub$?: Subscription;

  @Input() formControlName: string = "";
  @Input() formGroupRef: FormGroup = new FormGroup({});
  @Input() wrapperClasses: string = "";
  @Input() zoneClasses: string = "!min-h-[360px] mb-[20px]";
  @Input() multiple: boolean = true;
  @Input() accept: AcceptedFiles = AcceptedFiles.images;
  @Input() maxFileSize: number = 4000000;
  @Input() disabled: boolean = false;
  @Input() expandable: boolean = true;
  @Input() disableClick: boolean = false;
  @Input() processDirectoryDrop: boolean = false;

  files: AddedFiles[] = [];

  constructor(private cloudinaryService: CloudinaryService) { }

  ngOnDestroy(): void {
    this.uploadFilesSub$?.unsubscribe();
  }

  handleOnSelect = (event: NgxDropzoneChangeEvent) => {

    event.addedFiles.forEach((file, index) => {
      this.files.push({ filePreview: file, index });

      this.uploadFilesSub$ = this.cloudinaryService.uploadFiles({
        file,
        folder: "AngularRealState",
        resourceType: ResourceType.image
      }).subscribe(({ progress, state, file }) => {

        this.files[index].progress = progress;
        this.files[index].state = state;
        this.files[index].file = file;

        if (file) {
          this.cloudinaryService.emitSelectedFiles.emit(this.files.filter(file => file.file));
        }

      });
    });

  }

  hanleOnRemove(event: File, public_id: string) {

    const deletingFileIndex = this.files.findIndex(file => file.filePreview === event);

    this.files[deletingFileIndex].isDeleting = true;

    const deleteFilesSub$ = this.cloudinaryService.deleteFiles(
      {
        public_ids: [public_id],
        resourceType: ResourceType.image
      }
    ).subscribe(() => {

      this.files.splice(deletingFileIndex, 1);

      this.cloudinaryService.emitSelectedFiles.emit(this.files);

      deleteFilesSub$.unsubscribe();
    });
  }

}
