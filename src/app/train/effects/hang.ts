import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, mergeMap, takeUntil, withLatestFrom, takeWhile, concat, delay } from 'rxjs/operators';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { RangeObservable } from 'rxjs/observable/RangeObservable';

import {
  StartHangAction,
  START_HANG,
  HangTimePastAction,
  STOP_HANG,
  STOP_SESSION,
  StartRestAction,
  ShowSessionSummary,
  CountdownTimePastAction
} from '../actions/hang';
import { TrainState } from '../reducers/index';
import { zip } from 'rxjs/operators/zip';
import { startWith } from 'rxjs/operators/startWith';

@Injectable()
export class HangEffects {

  @Effect()
  run$: Observable<Action> = this.actions$.ofType<StartHangAction>(START_HANG)
    .pipe(
      withLatestFrom(this.store.select(s => s.train.hang.settings)),
      mergeMap(options => {
        const showCountdown = options[0].payload.showCountdown;
        const settings = options[1];
        const countdownSequence = showCountdown
          ? RangeObservable.create(1, settings.countdown)
            .pipe(
              zip(
                IntervalObservable.create(1000),
                t => new CountdownTimePastAction({ secondsLeft: settings.countdown - t })
              ),
              startWith(new CountdownTimePastAction({ secondsLeft: settings.countdown })),
            )
          : EmptyObservable.create<Action>();

        const hangSequence = RangeObservable.create(1, settings.maxPerRepetition)
          .pipe(
            zip(
              IntervalObservable.create(1000),
              t => new HangTimePastAction(t)
            ),
            takeUntil(this.actions$.ofType(ROUTER_NAVIGATION)),
            takeUntil(this.actions$.ofType(STOP_HANG, STOP_SESSION)),
            mergeMap(action => {
              const isComplete = action.payload === settings.maxPerRepetition;
              if (isComplete) {
                return settings.autoStart
                  ? ArrayObservable.of<Action>(action, new StartRestAction())
                  : ArrayObservable.of<Action>(action, new ShowSessionSummary());
              }

              return ArrayObservable.of<Action>(action);
            }),
            startWith<Action>(new HangTimePastAction(0))
          );

        return countdownSequence.pipe(concat(hangSequence));
      })
    );

  constructor(
    private actions$: Actions,
    private store: Store<TrainState>
  ) { }

}
