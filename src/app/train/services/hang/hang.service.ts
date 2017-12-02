import { Injectable } from '@angular/core/';
import { Store } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first, map, switchMap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../../root-reducer';
import { Hang } from './hang';

@Injectable()
export class HangService {

  constructor(
    private store: Store<AppState>,
    private http: HttpClient
  ) { }

  getAllHangs(): Observable<Hang[]> {
    return this.store.select(s => s.auth.jwt).pipe(
      first(t => !!t),
      map(token => new HttpHeaders({ authorization: 'Bearer ' + token })),
      switchMap(headers => this.http.get<Hang[]>('/api/hangs', { headers }))
    );
  }

  addHang(hang: Hang): Observable<Hang> {
    return this.store.select(s => s.auth.jwt).pipe(
      first(t => !!t),
      map(token => new HttpHeaders({ authorization: 'Bearer ' + token })),
      switchMap(headers => this.http.post<Hang>('/api/hangs', hang, { headers }))
    );
  }

}
