import { Action } from '@ngrx/store';

import { Hang } from '../services/hang/hang';

export const LOAD_TODAYS_HANG_TIME = '[Dashboard] Load Todays Hang Time';
export const LOAD_TODAYS_HANG_TIME_SUCCESS = '[Dashboard] Load Todays Hang Time Success';

export class LoadTodaysHangTimeAction implements Action {
  readonly type = LOAD_TODAYS_HANG_TIME;
}

export class LoadTodaysHangTimeSuccessAction implements Action {
  readonly type = LOAD_TODAYS_HANG_TIME_SUCCESS;

  constructor(public payload: { time: number, hangCount: number, hangs: Hang[] }) { }
}

export type DashboardActions = LoadTodaysHangTimeAction
                             | LoadTodaysHangTimeSuccessAction;

