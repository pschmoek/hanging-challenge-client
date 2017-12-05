import { DashboardActions, LOAD_TODAYS_HANG_TIME, LOAD_TODAYS_HANG_TIME_SUCCESS } from '../actions/dashboard';
import { Hang } from '../services/hang/hang';

export interface DashboardState {
  todaysHangTime: number;
  todaysHangCount: number;
  todaysHangs: Hang[];
  isLoadingHangTime: boolean;
}

export const initialState: DashboardState = {
  todaysHangCount: 0,
  todaysHangTime: 0,
  isLoadingHangTime: false,
  todaysHangs: []
};

export function dashboardReducer(state = initialState, action: DashboardActions): DashboardState {
  switch (action.type) {
    case LOAD_TODAYS_HANG_TIME:
      return {
        ...state,
        isLoadingHangTime: true
      };

    case LOAD_TODAYS_HANG_TIME_SUCCESS:
      return {
        ...state,
        isLoadingHangTime: false,
        todaysHangCount: action.payload.hangCount,
        todaysHangTime: action.payload.time,
        todaysHangs: action.payload.hangs
      };

    default:
      return state;
  }
}
