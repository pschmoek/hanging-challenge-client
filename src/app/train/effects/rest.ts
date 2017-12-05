import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { map, mergeMap, takeUntil, takeWhile, withLatestFrom } from 'rxjs/operators';

import { TrainState } from '../reducers/index';
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
  rest$: Observable<Action> = this.actions$.ofType<StartRestAction>(START_REST)
    .pipe(
      withLatestFrom(this.store.select(s => s.train.hang.settings)),
      map(v => v[1]),
      mergeMap(settings => {
        return IntervalObservable.create(1000)
          .pipe(
            map(t => settings.pauseTime - t - 1),
            takeUntil(this.actions$.ofType(ROUTER_NAVIGATION)),
            takeUntil(this.actions$.ofType(STOP_SESSION)),
            takeWhile(v => v >= 0),
            mergeMap(t => {
              if (t === 0) {
                return ArrayObservable.of<Action>(new RestTimePastAction(t), new StartHangAction({ showCountdown: false }));
              }

              return ArrayObservable.of<Action>(new RestTimePastAction(t));
            })
          );
      })
    );

  @Effect()
  startRestAfterHangStop$: Observable<Action> = this.actions$.ofType<StopHangAction>(STOP_HANG)
    .pipe(
      withLatestFrom(this.store.select(s => s.train.hang.settings)),
      map(v => v[1]),
      mergeMap(settings => settings.autoStart
        ? ArrayObservable.of<Action>(new StartRestAction())
        : ArrayObservable.of<Action>(new ShowSessionSummary())
      )
    );

  constructor(
    private actions$: Actions,
    private store: Store<TrainState>
  ) { }

}
