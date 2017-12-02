import { Injectable } from '@angular/core/';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first, filter, map, switchMap, finalize } from 'rxjs/operators';

import { Store } from '../../store/store';
import { Hang } from './hang';

@Injectable()
export class HangService {

  constructor(
    private store: Store,
    private http: HttpClient
  ) { }

  initHangs() {
    this.store.setIsLoadingHangs(true);
    this.store.state$.pipe(
      map(s => s.jwt),
      filter(t => t != null),
      first(),
      map(token => new HttpHeaders({ authorization: 'Bearer ' + token })),
      switchMap(headers => this.http.get<Hang[]>('/api/hangs', { headers })),
      finalize(() => this.store.setIsLoadingHangs(false))
    ).subscribe(hangs => this.store.setHangs(hangs));
  }

}
