import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneChangeEvent, NgxDropzoneModule } from 'ngx-dropzone';
import { CloudinaryService, ResourceType, UploadState } from 'src/app/services/cloudinary.service';
import { Subscription } from 'rxjs';
import { Base64ImagePipe } from 'src/app/pipes/base64-image.pipe';

export enum AcceptedFiles {
  all = "*",
  images = "image/jpeg,image/jpg,image/png,image/webp,image/svg",
  documents = "application/pdf,application/doc,application/docx",
  video = "video/mp4,video/x-m4v,video/*"
}

interface AddedFiles extends Partial<UploadState> {
  filePreview: File;
  index: number;
}

@Component({
  selector: 'app-drag-and-drop-zone',
  standalone: true,
  imports: [CommonModule, NgxDropzoneModule, Base64ImagePipe],
  templateUrl: './drag-and-drop-zone.component.html',
  styleUrls: ['./drag-and-drop-zone.component.css']
})
export class DragAndDropZoneComponent {

  uploadFilesSub$?: Subscription;

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

      // this.uploadFilesSub$ = this.cloudinaryService.uploadFiles({
      //   file: event.addedFiles[0],
      //   folder: "AngularRealState",
      //   resourceType: ResourceType.image
      // }).subscribe(({ progress, state, file }) => {

      //   this.files[index].progress = progress;
      //   this.files[index].state = state;
      //   this.files[index].file = file;

      // });
    });

  }

  hanleOnRemove(event: File) {
    this.files.splice(this.files.findIndex(file => file.filePreview === event), 1);
  }

}
