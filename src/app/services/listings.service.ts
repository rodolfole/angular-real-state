// Core Imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map, throwError } from 'rxjs';

import { Listing } from '../types/listing';
import { environment } from "../../environments/environment";

export interface IListingsParams {
  bathroomCount?: number;
  category?: string;
  endDate?: string;
  guestCount?: number;
  locationValue?: string;
  roomCount?: number;
  startDate?: string;
  userId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  constructor(private http: HttpClient) { }

  getListings(params: IListingsParams): Observable<Listing[]> {

    const url = `${environment.URI}/api/listings`;

    return this.http.get(url, { params: { ...params } }).pipe(
      map((resp: any) => resp),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

}
