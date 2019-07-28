import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of, empty } from 'rxjs';
import { map, concat, mergeMap } from 'rxjs/operators';

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

@Injectable()
export class AuthEffect {

  @Effect()
  loadJwt$: Observable<Action> = this.actions$.pipe(
    ofType<FacebookTokenReceived>(FACEBOOK_TOKEN_RECEIVED),
    mergeMap(action => action.payload
      ? of(new LoadJwtStart())
        .pipe(
          concat(
            this.authService.obtainJwt(action.payload)
              .pipe(map(jwt => new LoadJwtSuccess(jwt)))
          )
        )
      : empty()
    )
  );

  @Effect()
  loadUser$: Observable<Action> = this.actions$.pipe(
    ofType<LoadJwtSuccess>(LOAD_JWT_SUCCESS),
    mergeMap(() =>
      of(new LoadUserStart())
        .pipe(
          concat(
            this.userService.loadUser().pipe(map(user => new LoadUserSuccess(user)))
          )
        )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService
  ) { }

}
