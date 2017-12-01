import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthResponse } from './auth-response';
import { Store } from '../store/store';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  obtainJwt(fbAccessToken: string) {
    this.http.post<AuthResponse>('/api/rest/auth', { fbAccessToken })
      .subscribe(response => {
        this.store.setJwt(response.jwt);
      });
  }

}
