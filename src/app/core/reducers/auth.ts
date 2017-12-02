import { Action } from '@ngrx/store';

import * as auth from '../actions/auth';

export interface State {
  facebookToken: string | null;
  loadingJwt: boolean;
  jwt: string | null;
  loadingUser: boolean;
  userName: string | null;
}

export const initialState: State = {
  facebookToken: null,
  loadingJwt: false,
  jwt: null,
  loadingUser: false,
  userName: null
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.FACEBOOK_TOKEN_RECEIVED:
      return {
        ...state,
        facebookToken: action.payload
      };

    case auth.LOAD_JWT_START:
      return {
        ...state,
        loadingJwt: true
      };

    case auth.LOAD_JWT_SUCCESS:
      return {
        ...state,
        loadingJwt: false,
        jwt: action.payload
      };

    case auth.LOAD_USER_START:
      return {
        ...state,
        loadingUser: true
      };

    case auth.LOAD_USER_SUCCESS:
      return {
        ...state,
        loadingUser: false,
        userName: action.payload.userName
      };

    default:
      return state;
  }
}
