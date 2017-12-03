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
import { HangService } from '../services/hang/hang.service';
import { LoadHangsAction, LoadHangsSuccessAction } from '../actions/hang';

@Injectable()
export class InitEffect {

  @Effect()
  init$: Observable<Action> = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
    .pipe(
      map(a => a.payload.routerState.url),
      filter(url => url === '/train'),
      mergeMap(url => {
        return ArrayObservable.of<Action>(new LoadHangsAction())
          .pipe(
            concat(this.hangService.getAllHangs()
              .pipe(
                map(h => new LoadHangsSuccessAction(h))
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
