// // Core Imports
// import { HttpClient, HttpEvent } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// // External Imports
// import { FileUploader, FileUploaderOptions, FileItem } from 'ng2-file-upload';
// import { catchError, map } from 'rxjs/operators';
// import { Cloudinary } from "@cloudinary/angular-5.x";
// import { throwError, Observable } from 'rxjs';

// // Services
// import { UpdateDataService } from "./updateData.service";
// import { NotificationsService } from "./notifications.service";

// export interface FolderClass {
//     mainFolder: string;
//     subfolder: string;
// }

// export interface UploaderResponse {
//     url: string;
//     public_id: string;
//     size: number;
//     name: string;
//     tags: string;
//     context: string;
// }

// @Injectable({
//     providedIn: "root",
// })

// export class CloudinaryV2Service {
//     constructor(
//         private cloudinary: Cloudinary,
//         private http: HttpClient,
//         public _notificationsS: NotificationsService,
//         public _updateDS: UpdateDataService
//     ) { }

//     configureUploader(uploaderInstance: FileUploader, folderName: string, formatFile: string) {

//         // Configurate Cloudinary Data Before Upload Files
//         uploaderInstance.onBuildItemForm = (fileItem: any, form: FormData): any => {

//             // Add Cloudinary unsigned upload preset to the upload form
//             form.append("upload_preset", this.cloudinary.config().upload_preset);

//             // Add File Title And Description
//             if (fileItem.formData.length > 0)
//                 form.append(
//                     "context",
//                     `alt=${fileItem.formData[0].alt}|caption=${fileItem.formData[0].caption}`
//                 );

//             // Add folder
//             form.append("folder", folderName);

//             // Add file to upload
//             form.append("file", fileItem);

//             // Use default "withCredentials" value for CORS requests
//             fileItem.withCredentials = false;

//             return { fileItem, form };
//         };

//         uploaderInstance.onErrorItem = function (fileItem, response, status, headers) {
//             console.info('onErrorItem', fileItem, response, status, headers);
//         };

//         uploaderInstance.onWhenAddingFileFailed = () => {
//             this.formatInvalidError(formatFile, uploaderInstance);
//         };
//     };

//     createFormDataObject(fileItem: FileItem, folderName: string) {

//         const formData = new FormData();

//         // Add Cloudinary unsigned upload preset to the upload form
//         formData.append("upload_preset", this.cloudinary.config().upload_preset);

//         // Add File Title And Description
//         // formData.append(
//         //     "context",
//         //     `alt=${fileItem.file.name}|caption=${fileItem.file.}`
//         // );

//         // formData.append("cloud_name", this.cloudinary.config().cloud_name);

//         // Add folder
//         formData.append("folder", folderName);

//         // Add file to upload
//         formData.append("file", fileItem as any);

//         return formData;
//     }

//     createUploaderInstance(folderName: string, formatFile: string): Promise<FileUploader> {
//         // Create the file uploader, wire it to upload to your account
//         const uploaderOptions: FileUploaderOptions = {
//             url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/auto/upload`,

//             allowedFileType: formatFile === "file"
//                 ? ["doc", "docx", "pdf", "image"]
//                 : ["image"],

//             // Upload files automatically upon addition to upload queue
//             autoUpload: false,

//             // Use xhrTransport in favor of iframeTransport
//             isHTML5: true,

//             // Calculate progress independently for each uploaded file
//             removeAfterUpload: true,

//             // XHR request headers
//             headers: [
//                 {
//                     name: "X-Requested-With",
//                     value: "XMLHttpRequest",
//                 },
//             ],
//         };

//         const uploaderInstance = new FileUploader(uploaderOptions)

//         this.configureUploader(uploaderInstance, folderName, formatFile);

//         return new Promise(resolve => resolve(uploaderInstance));
//     }

//     formatInvalidError(formatFile: string, uploaderInstance: FileUploader) {
//         if (formatFile === "image") {
//             const validExtensions = this.validExtensions(formatFile);

//             this._notificationsS.message(
//                 {
//                     icon: "error",
//                     title: "Formato no valido",
//                     text: `Sólo se permiten: ${validExtensions.join(", ")}`,
//                     confirmButtonText: "OK"
//                 }
//             );
//         } else {
//             const validExtensions = this.validExtensions(formatFile);

//             this._notificationsS.message(
//                 {
//                     icon: "error",
//                     title: "Formato no valido",
//                     text: `Sólo se permiten: ${validExtensions.join(", ")}`,
//                     confirmButtonText: "OK"
//                 }
//             );
//         }

//         uploaderInstance.clearQueue();
//     }

//     uploadFiles = (uploaderInstance: FileUploader) => new Promise<UploaderResponse>((resolve, reject) => {

//         // Check if HTTP request was successful
//         const upsertResponse = (fileItem: any): any => {
//             if (fileItem.status !== 200) {
//                 reject(false);
//                 return false;
//             }
//         };

//         // Return Files After They Have Been Uploaded Successfully
//         uploaderInstance.onCompleteItem = (item: any, response: string, status: number) => {

//             upsertResponse({
//                 file: item.file,
//                 status,
//                 data: JSON.parse(response),
//             });

//             const data = JSON.parse(response);
//             const name = `${data.original_filename}.${data.url.split(".").pop()}`;
//             const url = data.secure_url;
//             const public_id = data.public_id;
//             const size = data.bytes;
//             const tags = data.tags;
//             const context = data.context ? data.context.custom : "";

//             resolve({ url, public_id, size, name, tags, context });
//         };

//         uploaderInstance.uploadAll();
//     });

//     uploadFilesToCloudinary(fileItem: FileItem, folderName: string): Observable<HttpEvent<UploaderResponse>> {

//         const url = `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/auto/upload`;

//         const formData = this.createFormDataObject(fileItem, folderName);

//         return this.http.post<UploaderResponse>(url, formData, { reportProgress: true, observe: 'events' }).pipe(
//             map((resp: any) => resp),
//             catchError((err) => {
//                 return throwError(() => err);
//             })
//         );
//     }

//     validExtensions(formatType: string): Array<string> {
//         return formatType === 'image' ? [
//             "jpg",
//             "jpeg",
//             "png",
//             "gif",
//             "bmp",
//             "webp",
//             "tiff",
//             "jfif",
//         ] : [
//             "doc",
//             "docx",
//             "pdf",
//             "png",
//             "jpg",
//             "jpeg",
//             "gif",
//             "webp",
//             "jfif",
//         ];
//     }
// }
