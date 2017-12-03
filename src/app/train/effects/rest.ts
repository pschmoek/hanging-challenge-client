import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { map, mergeMap, takeUntil, takeWhile, withLatestFrom } from 'rxjs/operators';

import { HangCompleteAction, HANG_COMPLETE, RestCompleteAction, RestTimePastAction } from '../actions/hang';
import { TrainState } from '../reducers/index';

@Injectable()
export class RestEffects {

  @Effect()
  rest$: Observable<Action> = this.actions$.ofType<HangCompleteAction>(HANG_COMPLETE)
    .pipe(
      withLatestFrom(this.store.select(s => s.train.hang.settings)),
      map(v => v[1]),
      mergeMap(settings => {
        if (!settings.autoStart) {
          return EmptyObservable.create();
        }

        const routerAction = this.actions$.ofType(ROUTER_NAVIGATION);
        return IntervalObservable.create(1000)
          .pipe(
            map(t => settings.pauseTime - t - 1),
            takeUntil(routerAction),
            takeWhile(v => v >= 0),
            mergeMap(t => {
              if (t === 0) {
                return ArrayObservable.of<Action>(new RestCompleteAction());
              }

              return ArrayObservable.of<Action>(new RestTimePastAction(t));
            })
          );
      })
    );

  constructor(
    private actions$: Actions,
    private store: Store<TrainState>
  ) { }

}
