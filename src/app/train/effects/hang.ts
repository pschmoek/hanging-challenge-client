import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, mergeMap, takeUntil, withLatestFrom, takeWhile } from 'rxjs/operators';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';

import { StartHangAction, START_HANG, HangTimePastAction, HangCompleteAction, RestCompleteAction, REST_COMPLETE } from '../actions/hang';
import { TrainState } from '../reducers/index';

@Injectable()
export class HangEffects {

  @Effect()
  run$: Observable<Action> = this.actions$.ofType<StartHangAction|RestCompleteAction>(START_HANG, REST_COMPLETE)
    .pipe(
      withLatestFrom(this.store.select(s => s.train.hang.settings)),
      map(v => v[1]),
      mergeMap(settings => {
        const routerAction = this.actions$.ofType(ROUTER_NAVIGATION);
        const start = new Date().toISOString();

        return IntervalObservable.create(1000)
          .pipe(
            map(t => t + 1),
            takeUntil(routerAction),
            takeWhile(v => v <= settings.maxPerRepetition),
            mergeMap(t => {
              if (t === settings.maxPerRepetition) {
                const end = new Date().toISOString();

                return ArrayObservable.of<Action>(new HangCompleteAction({ start, end }));
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
