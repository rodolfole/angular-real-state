import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { SafeUser } from '../types';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  user: SafeUser | null = null;

  getCurrentUser(): Observable<SafeUser> {

    const url = `${environment.URI}/api/users`;

    return this.http.get(url).pipe(
      map((resp: any) => resp),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }
}
