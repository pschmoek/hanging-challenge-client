import { ActionReducerMap, createSelector } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { HttpHeaders } from '@angular/common/http';

import { RouterStateUrl } from './app-routing.module';
import * as fromAuth from './core/reducers/auth';
import { dashboardReducer, DashboardState } from './core/reducers/dashboard';

export interface AppState {
  auth: fromAuth.State;
  router: RouterReducerState<RouterStateUrl>;
  dashboard: DashboardState;
}

export const rootReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.reducer,
  router: routerReducer,
  dashboard: dashboardReducer
};

export const getAuthState = (state: AppState) => state.auth;
export const getDashboardState = (state: AppState) => state.dashboard;

export const selectHttpHeaders = createSelector(getAuthState, s => {
  if (!s.jwt) {
    return null;
  }

  return new HttpHeaders({ authorization: 'Bearer ' + s.jwt });
});

export const selectTodaysHangSeries = createSelector(getDashboardState, d => {
  const result: { name: string, value: number }[] = [];
  for (const hang of d.todaysHangs) {
    const hangDuration = Math.round(Math.abs(+new Date(hang.end) - +new Date(hang.start)) / 1000);
    const previousDuration = result.length > 0 ? result[result.length - 1].value : 0;

    result.push({
      name: new Date(hang.start).toLocaleTimeString(),
      value: previousDuration + hangDuration
    });
  }

  return result;
});
