import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { RouterNavigationAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { mergeMap, map } from 'rxjs/operators';
import { TrainState } from '../reducers/index';

import { HangService } from '../services/hang/hang.service';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { LoadHangsAction } from '../actions/hang';
import { filter } from 'rxjs/operators/filter';
import { Store } from '@ngrx/store/src/store';

@Injectable()
export class InitEffect {

  @Effect()
  init$: Observable<Action> = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
    .pipe(
      map(a => a.payload.routerState.url),
      filter(url => url === '/train'),
      mergeMap(url => {
        return ArrayObservable.of<Action>(new LoadHangsAction());
      })
    );

  constructor(
    private actions$: Actions,
    private hangService: HangService,
    private store: Store<TrainState>
  ) { }

}
