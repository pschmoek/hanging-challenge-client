import { Injectable } from '@angular/core/';
import { Store } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first, map, switchMap, finalize, filter } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { Hang } from './hang';
import { TrainState } from '../../reducers/index';
import { selectHttpHeaders } from '../../../root-reducer';

@Injectable()
export class HangService {

  constructor(
    private store: Store<TrainState>,
    private http: HttpClient
  ) { }

  getTodaysHangs(): Observable<Hang[]> {
    const today = new Date().toISOString().split('T')[0];
    return this.store.select(s => s.auth.jwt).pipe(
      first(t => !!t),
      map(token => new HttpHeaders({ authorization: 'Bearer ' + token })),
      switchMap(headers => this.http.get<Hang[]>(`/api/hangs/${today}`, { headers }))
    );
  }

  addHangs(hangs: Hang[]): Observable<Hang[]> {
    return this.store.select(s => s.auth.jwt).pipe(
      first(t => !!t),
      map(token => new HttpHeaders({ authorization: 'Bearer ' + token })),
      switchMap(headers => this.http.post<Hang[]>('/api/hangs', { hangs }, { headers }))
    );
  }

}
