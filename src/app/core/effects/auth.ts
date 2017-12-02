import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { map, concat, filter, mergeMap } from 'rxjs/operators';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';

import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';

import {
  FacebookTokenReceived,
  LoadJwtSuccess,
  FACEBOOK_TOKEN_RECEIVED,
  LOAD_JWT_SUCCESS,
  LoadJwtStart,
  LoadUserStart,
  LoadUserSuccess
} from '../actions/auth';
import { AppState } from '../../root-reducer';

@Injectable()
export class AuthEffect {

  @Effect()
  loadJwt$: Observable<Action> = this.actions$.ofType<FacebookTokenReceived>(FACEBOOK_TOKEN_RECEIVED)
    .pipe(
      mergeMap(action => action.payload
        ? ArrayObservable.of(new LoadJwtStart())
          .pipe(
            concat(
              this.authService.obtainJwt(action.payload)
                .pipe(map(jwt => new LoadJwtSuccess(jwt)))
            )
          )
        : EmptyObservable.create()
      )
    );

  @Effect()
  loadUser$: Observable<Action> = this.actions$.ofType<LoadJwtSuccess>(LOAD_JWT_SUCCESS)
    .pipe(
      mergeMap(() =>
        ArrayObservable.of(new LoadUserStart())
          .pipe(
            concat(
              this.userService.loadUser().pipe(map(user => new LoadUserSuccess(user)))
            )
          )
      )
    );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private authService: AuthService,
    private userService: UserService
  ) { }

}
