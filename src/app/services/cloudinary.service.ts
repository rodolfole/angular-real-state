import { Injectable } from '@angular/core';

export interface FilesResponse {
  url: string;
  public_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  constructor() { }
}
