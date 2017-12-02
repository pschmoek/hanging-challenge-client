import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { AuthResponse } from './auth-response';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  obtainJwt(fbAccessToken: string): Observable<string> {
    return this.http.post<AuthResponse>('/api/auth', { fbAccessToken })
      .pipe(
        map(response => response.jwt)
      );
  }

}
