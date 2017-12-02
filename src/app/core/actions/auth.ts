import { Action } from '@ngrx/store';

import { User } from '../services/user/user';

export const FACEBOOK_TOKEN_RECEIVED = '[Auth] Facebook Token Received';
export const LOAD_JWT_START = '[Auth] Load JWT Start';
export const LOAD_JWT_SUCCESS = '[Auth] Load JWT Success';
export const LOAD_USER_START = '[Auth] Load User Start';
export const LOAD_USER_SUCCESS = '[Auth] Load User Success';

export class FacebookTokenReceived implements Action {
  readonly type = FACEBOOK_TOKEN_RECEIVED;

  constructor(public payload: string|null) { }
}

export class LoadJwtStart implements Action {
  readonly type = LOAD_JWT_START;
}

export class LoadJwtSuccess implements Action {
  readonly type = LOAD_JWT_SUCCESS;

  constructor(public payload: string) { }
}

export class LoadUserStart implements Action {
  readonly type = LOAD_USER_START;
}

export class LoadUserSuccess implements Action {
  readonly type = LOAD_USER_SUCCESS;

  constructor(public payload: User) { }
}

export type Actions = FacebookTokenReceived
                    | LoadJwtStart
                    | LoadJwtSuccess
                    | LoadUserStart
                    | LoadUserSuccess;
