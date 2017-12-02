import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { first, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { User } from './user';
import { AppState } from '../../../root-reducer';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) { }

  loadUser(): Observable<User> {
    return this.store.select(s => s.auth.jwt).pipe(
      first(t => !!t),
      map(token => new HttpHeaders({ authorization: 'Bearer ' + token })),
      switchMap(headers => this.http.get<User>('/api/user', { headers }))
    );
  }

}
