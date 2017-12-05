import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { RouterNavigationAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { mergeMap, map, filter, concat } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';

import { TrainState } from '../reducers/index';
import { LoadTodaysHangsAction, LoadTodaysHangsSuccessAction } from '../actions/hang';
import { HangService } from '../../core/services/hang/hang.service';

@Injectable()
export class InitEffect {

  @Effect()
  init$: Observable<Action> = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
    .pipe(
      map(a => a.payload.routerState.url),
      filter(url => url === '/train'),
      mergeMap(url => {
        return ArrayObservable.of<Action>(new LoadTodaysHangsAction())
          .pipe(
            concat(this.hangService.getTodaysHangs()
              .pipe(
                map(h => new LoadTodaysHangsSuccessAction(h))
              )
            )
          );
      })
    );

  constructor(
    private actions$: Actions,
    private hangService: HangService,
    private store: Store<TrainState>
  ) { }

}
