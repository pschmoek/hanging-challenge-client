import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { RouterStateUrl } from './app-routing.module';

import * as fromAuth from './core/reducers/auth';

export interface AppState {
  auth: fromAuth.State;
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers = {
  auth: fromAuth.reducer,
  router: routerReducer,
};
