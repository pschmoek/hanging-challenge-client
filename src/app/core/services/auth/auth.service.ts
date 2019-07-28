import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
