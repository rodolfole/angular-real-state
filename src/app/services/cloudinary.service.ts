import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, scan, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

interface UploadResponseContext {
  custom: {
    alt: string;
    caption: string;
  }
}

export interface UploadResponse {
  asset_id: string;
  bytes: number;
  context: UploadResponseContext;
  created_at: Date;
  format: string;
  height: number;
  original_extension: string;
  original_filename: string;
  public_id: string;
  resource_type: ResourceType;
  tags: string[];
  url: string;
  width: number;
}

export interface UploadState {
  progress: number
  state: 'PENDING' | 'IN_PROGRESS' | 'DONE',
  file?: UploadResponse
}

export enum ResourceType {
  image = "image",
  raw = "raw",
  video = "video",
  auto = "auto"
}

export interface UploadParams {
  resourceType: ResourceType;
  folder: string;
  file: File;
  context?: {
    alt?: string;
    caption?: string;
  },
  tags?: string
}

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  constructor(private http: HttpClient) { }

  isHttpResponse<T>(event: HttpEvent<T>): event is HttpResponse<T> {
    return event.type === HttpEventType.Response
  }

  isHttpProgressEvent(
    event: HttpEvent<unknown>
  ): event is HttpProgressEvent {
    return (
      event.type === HttpEventType.DownloadProgress ||
      event.type === HttpEventType.UploadProgress
    )
  }

  calculateState = (upload: UploadState, event: HttpEvent<unknown>): UploadState => {
    if (this.isHttpProgressEvent(event)) {
      return {
        progress: event.total
          ? Math.round((100 * event.loaded) / event.total)
          : upload.progress,
        state: 'IN_PROGRESS',
      }
    }
    if (this.isHttpResponse(event)) {
      return {
        progress: 100,
        state: 'DONE',
        file: event.body as UploadResponse
      }
    }
    return upload
  }

  upload = (): (source: Observable<HttpEvent<unknown>>) => Observable<UploadState> => {
    const initialState: UploadState = { state: 'PENDING', progress: 0 }
    return (source) => source.pipe(scan(this.calculateState, initialState))
  }

  uploadFiles(props: UploadParams): Observable<UploadState> {

    const apiUrl = 'https://api.cloudinary.com/v1_1/';

    const endPointUrl = apiUrl + environment.CLOUDINARY_NAME + "/" + props.resourceType + "/upload";

    const data = new FormData();

    data.append('upload_preset', environment.CLOUDINARY_PRESET);
    data.append('folder', props.folder);
    data.append('file', props.file);
    if (props.context) data.append('context', `alt=${props.context.alt}|caption=${props.context.caption}`);
    if (props.tags) data.append('tags', props.tags);

    return this.http.post<UploadResponse>(endPointUrl, data, { reportProgress: true, observe: 'events' })
      .pipe(
        this.upload(),
        catchError(this.errorMgmt));
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
