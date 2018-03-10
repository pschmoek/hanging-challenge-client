import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { mergeMap, takeUntil, withLatestFrom, concat, startWith, zip } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { range } from 'rxjs/observable/range';
import { interval } from 'rxjs/observable/interval';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';

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
          ? range(1, settings.countdown)
            .pipe(
              zip(
                interval(1000),
                t => new CountdownTimePastAction({ secondsLeft: settings.countdown - t })
              ),
              startWith(new CountdownTimePastAction({ secondsLeft: settings.countdown })),
            )
          : empty<Action>();

        const hangSequence = range(1, settings.maxPerRepetition)
          .pipe(
            zip(
              interval(1000),
              t => new HangTimePastAction(t)
            ),
            takeUntil(this.actions$.ofType(ROUTER_NAVIGATION)),
            takeUntil(this.actions$.ofType(STOP_HANG, STOP_SESSION)),
            mergeMap(action => {
              const isComplete = action.payload === settings.maxPerRepetition;
              if (isComplete) {
                return settings.autoStart
                  ? of<Action>(action, new StartRestAction())
                  : of<Action>(action, new ShowSessionSummary());
              }

              return of<Action>(action);
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
