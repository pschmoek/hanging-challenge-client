import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, filter, mergeMap, concat } from 'rxjs/operators';

import { LoadTodaysHangTimeAction, LoadTodaysHangTimeSuccessAction } from '../actions/dashboard';
import { HangService } from '../services/hang/hang.service';
import { Hang } from '../services/hang/hang';

@Injectable()
export class InitDashboardEffect {

  @Effect()
  initDashboard$: Observable<Action> = this.actions$
    .pipe(
      ofType<RouterNavigationAction>(ROUTER_NAVIGATION),
      map(a => a.payload.routerState.url),
      filter(url => url === '/'),
      mergeMap(() => of(new LoadTodaysHangTimeAction())
        .pipe(
          concat(this.hangService.getTodaysHangs().pipe(
              map(hangSessions => {
                const hangs: Hang[] = [];
                hangSessions.forEach(s => s.hangs.forEach(h => hangs.push(h)));
                const time = hangs.reduce(
                  (prev, cur) => prev + Math.round(Math.abs(+new Date(cur.end) - +new Date(cur.start)) / 1000) , 0);
                const hangCount = hangs.length;

                return new LoadTodaysHangTimeSuccessAction({ hangCount, time, hangs });
              })
            )
          )
        )
      )
    );

  constructor(
    private actions$: Actions,
    private hangService: HangService
  ) { }

}
