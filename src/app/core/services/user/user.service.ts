import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first, filter, map, switchMap } from 'rxjs/operators';

import { Store } from '../../../store/store';
import { User } from './user';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  loadUser() {
    this.store.state$.pipe(
      map(s => s.jwt),
      filter(t => t != null),
      first(),
      map(token => new HttpHeaders({ authorization: 'Bearer ' + token })),
      switchMap(headers => this.http.get<User>('/api/user', { headers }))
    ).subscribe(user => this.store.setUser(user));
  }

}
