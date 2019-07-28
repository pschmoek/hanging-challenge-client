import { Injectable } from '@angular/core';

import { HangSession } from './hang-session';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../root-reducer';
import { map, first, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class HangSessionService {
  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) {}

  save(hangSession: HangSession): Observable<HangSession> {
    return this.store.select(s => s.auth.jwt).pipe(
      first(t => !!t),
      map(token => new HttpHeaders({ authorization: 'Bearer ' + token })),
      switchMap(headers => this.http.post<HangSession>(`/api/hang-sessions`, hangSession, { headers }))
    );
  }
}
