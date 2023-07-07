// Core Imports
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map, throwError } from 'rxjs';

import { Listing } from '../types/listing';
import { environment } from '../../environments/environment';

export interface IListingsParams {
  category?: string;
  userId?: string;
}

export interface ListingsByCategory {
  listings: Listing[];
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  constructor(private http: HttpClient) {}

  public emitFilterCategory: EventEmitter<string> = new EventEmitter();

  getListings(params?: IListingsParams): Observable<Listing[]> {
    const url = `${environment.URI}/api/listings`;

    return this.http.get(url, { params: { ...params } }).pipe(
      map((resp: any) => resp),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getListingById(listingId: string): Observable<Listing> {
    const url = `${environment.URI}/api/listings/${listingId}`;

    return this.http.get(url).pipe(
      map((resp: any) => resp),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }
}
