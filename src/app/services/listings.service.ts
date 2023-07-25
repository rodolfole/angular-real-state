// Core Imports
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, lastValueFrom, map, throwError } from 'rxjs';

import { Listing } from '../types/listing';
import { environment } from '../../environments/environment';

export interface IListingsParams {
  category?: string;
  userId?: string;
}

export interface ListingsByCategory {
  listings?: Listing[];
  isLoading: boolean;
}

interface ListingResponse {
  ok: boolean;
  listing?: Listing;
  listings?: Listing[];
}

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  constructor(private http: HttpClient) { }

  public emitFilterCategory: EventEmitter<ListingsByCategory> = new EventEmitter();
  public emitStepperData: EventEmitter<Listing> = new EventEmitter();
  public emitIsSaving: EventEmitter<boolean> = new EventEmitter();

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

  async filterListingsByCategory(category: string) {
    this.emitFilterCategory.emit({ isLoading: true });
    const newListingsByCategory = await lastValueFrom(this.getListings({ category }));
    this.emitFilterCategory.emit({ isLoading: false, listings: newListingsByCategory });
  }

  createListing(listingData: Listing): Observable<ListingResponse> {
    const url = `${environment.URI}/api/listings`;

    console.log(listingData);

    return this.http.post<ListingResponse>(url, listingData).pipe(
      map((resp) => resp),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }
}
