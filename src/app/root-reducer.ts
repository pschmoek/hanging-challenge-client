import { ActionReducerMap, createSelector } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { HttpHeaders } from '@angular/common/http';

import { RouterStateUrl } from './app-routing.module';
import * as fromAuth from './core/reducers/auth';

export interface AppState {
  auth: fromAuth.State;
  router: RouterReducerState<RouterStateUrl>;
}

export const rootReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.reducer,
  router: routerReducer,
};

export const getAuthState = (state: AppState) => state.auth;

export const selectHttpHeaders = createSelector(getAuthState, s => {
  if (!s.jwt) {
    return null;
  }

  return new HttpHeaders({ authorization: 'Bearer ' + s.jwt });
});
