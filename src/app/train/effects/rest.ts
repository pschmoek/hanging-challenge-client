import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Observable, interval, of } from 'rxjs';
import { map, mergeMap, takeUntil, takeWhile, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../reducers/index';
import {
  StartRestAction,
  START_REST,
  STOP_SESSION,
  RestTimePastAction,
  StartHangAction,
  StopHangAction,
  STOP_HANG,
  ShowSessionSummary
} from '../actions/hang';

@Injectable()
export class RestEffects {

  @Effect()
  rest$: Observable<Action> = this.actions$.pipe(
    ofType<StartRestAction>(START_REST),
    withLatestFrom(this.store.select(s => s.train.hang.settings)),
    map(v => v[1]),
    mergeMap(settings => {
      return interval(1000)
        .pipe(
          map(t => settings.pauseTime - t - 1),
          takeUntil(this.actions$.pipe(ofType(ROUTER_NAVIGATION))),
          takeUntil(this.actions$.pipe(ofType(STOP_SESSION))),
          takeWhile(v => v >= 0),
          mergeMap(t => {
            if (t === 0) {
              return of<Action>(new RestTimePastAction(t), new StartHangAction({ showCountdown: false }));
            }

            return of<Action>(new RestTimePastAction(t));
          })
        );
    })
  );

  @Effect()
  startRestAfterHangStop$: Observable<Action> = this.actions$
    .pipe(
      ofType<StopHangAction>(STOP_HANG),
      withLatestFrom(this.store.select(s => s.train.hang.settings)),
      map(v => v[1]),
      mergeMap(settings => settings.autoStart
        ? of<Action>(new StartRestAction())
        : of<Action>(new ShowSessionSummary())
      )
    );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) { }

}
