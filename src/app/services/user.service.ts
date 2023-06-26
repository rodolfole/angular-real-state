import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { SafeUser } from '../types';

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

  registerUser(user: any) {
    const url = `${environment.URI}/api/user/register`;

    return this.http.post(url, user).pipe(
      map((resp: any) => resp),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getAgentById(id: string): Observable<SafeUser> {

    const url = `${environment.URI}/api/users/agent`;

    return this.http.get(url, { params: { id } }).pipe(
      map((resp: any) => resp),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }
}
