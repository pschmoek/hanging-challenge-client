import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, mergeMap, takeUntil, withLatestFrom, takeWhile } from 'rxjs/operators';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';

import {
  StartHangAction,
  START_HANG,
  HangTimePastAction,
  STOP_HANG,
  STOP_SESSION,
  StartRestAction,
  ShowSessionSummary
} from '../actions/hang';
import { TrainState } from '../reducers/index';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';

@Injectable()
export class HangEffects {

  @Effect()
  run$: Observable<Action> = this.actions$.ofType<StartHangAction>(START_HANG)
    .pipe(
      withLatestFrom(this.store.select(s => s.train.hang.settings)),
      map(v => v[1]),
      mergeMap(settings => {
        const start = new Date().toISOString();

        return IntervalObservable.create(1000)
          .pipe(
            map(t => t + 1),
            takeUntil(this.actions$.ofType(ROUTER_NAVIGATION)),
            takeUntil(this.actions$.ofType(STOP_HANG, STOP_SESSION)),
            takeWhile(v => v <= settings.maxPerRepetition),
            mergeMap(t => {
              const isComplete = t === settings.maxPerRepetition;
              if (isComplete) {
                return settings.autoStart
                  ? ArrayObservable.of<Action>(new HangTimePastAction(t), new StartRestAction())
                  : ArrayObservable.of<Action>(new HangTimePastAction(t), new ShowSessionSummary());
              }

              return ArrayObservable.of<Action>(new HangTimePastAction(t));
            })
          );
      })
    );

  constructor(
    private actions$: Actions,
    private store: Store<TrainState>
  ) { }

}
