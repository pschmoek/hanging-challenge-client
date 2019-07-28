import { Injectable } from '@angular/core/';
import { Store } from '@ngrx/store';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { first, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HangSession } from './hang-session';
import { AppState } from '../../../root-reducer';

@Injectable()
export class HangService {

  constructor(
    private store: Store<AppState>,
    private http: HttpClient
  ) { }

  getTodaysHangs(): Observable<HangSession[]> {
    const params = new HttpParams().append('date', new Date().toISOString().split('T')[0]);
    return this.store.select(s => s.auth.jwt).pipe(
      first(t => !!t),
      map(token => new HttpHeaders({ authorization: 'Bearer ' + token })),
      switchMap(headers => this.http.get<HangSession[]>(`/api/hang-sessions`, { headers, params }))
    );
  }
}
