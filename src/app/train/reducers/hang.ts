import {
  HangActions,
  LOAD_TODAYS_HANGS,
  LOAD_TODAYS_HANGS_SUCCESS,
  SAVE_CURRENT_HANG_SESSION,
  SAVE_CURRENT_HANG_SESSION_SUCCESS,
  DISCARD_CURRENT_HANG_SESSION,
  START_HANG,
  HANG_TIME_PAST,
  START_REST,
  REST_TIME_PAST,
  STOP_SESSION,
  SET_OVERLAY_TEXT,
  SETTINGS_CHANGE,
  SET_DEFAULT_HANG_ACTIVITY_SETTINGS,
  STOP_HANG,
  SHOW_SESSION_SUMMARY
} from '../actions/hang';
import { Hang } from '../../core/services/hang/hang';

export interface HangActivitySettings {
  countdown: number;
  endTimeBuffer: number;
  maxPerRepetition: number;
  autoStart: boolean;
  pauseTime: number;
}

export interface HangSession {
  start: Date|null;
  end: Date|null;
  hangs: Hang[];
}

export interface RunningHang {
  start: Date|null;
  currentTime: number|null;
  maxTime: number;
  lastHangTimeInSession: number|null;
}

export interface RunningRest {
  currentTime: number|null;
  totalRestTime: number;
}

export interface HangState {
  display: 'ReadyToStart'|'Running'|'Resting'|'SessionSummary';
  settings: HangActivitySettings;
  runningHang: RunningHang;
  resting: RunningRest;
  currentSession: HangSession;
  overlayText: string|null;
  todaysHangs: Hang[];
  isLoadingHangs: boolean;
  isSavingCurrentSession: boolean;
}

export const initialState: HangState = {
  display: 'ReadyToStart',
  settings: {
    autoStart: true,
    countdown: 5,
    endTimeBuffer: 3,
    maxPerRepetition: 5, // 60
    pauseTime: 5 // 60
  },
  runningHang: {
    start: null,
    currentTime: null,
    lastHangTimeInSession: null,
    maxTime: 0
  },
  resting: {
    currentTime: null,
    totalRestTime: 0
  },
  currentSession: {
    start: null,
    end: null,
    hangs: []
  },
  overlayText: null,
  todaysHangs: [],
  isLoadingHangs: false,
  isSavingCurrentSession: false
};

export function reducer(state = initialState, action: HangActions): HangState {
  switch (action.type) {
    case LOAD_TODAYS_HANGS:
      return {
        ...state,
        isLoadingHangs: true
      };

    case LOAD_TODAYS_HANGS_SUCCESS:
      return {
        ...state,
        isLoadingHangs: false,
        todaysHangs: action.payload
      };

    case SAVE_CURRENT_HANG_SESSION:
      return {
        ...state,
        isSavingCurrentSession: true
      };

    case SAVE_CURRENT_HANG_SESSION_SUCCESS:
      return {
        ...state,
        display: 'ReadyToStart',
        isSavingCurrentSession: false,
        todaysHangs: [...state.todaysHangs, ...action.payload],
        currentSession: {
          ...initialState.currentSession
        },
        runningHang: {
          ...initialState.runningHang
        },
        resting: {
          ...initialState.resting
        }
      };

    case DISCARD_CURRENT_HANG_SESSION:
      return {
        ...state,
        display: 'ReadyToStart',
        currentSession: {
          ...initialState.currentSession
        },
        runningHang: {
          ...initialState.runningHang
        },
        resting: {
          ...initialState.resting
        }
      };

    case START_HANG: {
      const isFirstRun = state.currentSession.hangs.length === 0;
      const lastHangInSession = !isFirstRun
        ? state.currentSession.hangs[state.currentSession.hangs.length - 1]
        : null;
      const lastHangTime = lastHangInSession
        ? Math.round(
            // Diff in milliseconds / 1000
            Math.abs(+new Date(lastHangInSession.end) - +new Date(lastHangInSession.start)) / 1000
        )
        : null;

      return {
        ...state,
        display: 'Running',
        runningHang: {
          currentTime: 0,
          lastHangTimeInSession: lastHangTime,
          maxTime: state.settings.maxPerRepetition,
          start: new Date()
        },
        currentSession: isFirstRun
          ? {
              start: new Date(),
              end: null,
              hangs: []
          }
          : state.currentSession

      };
    }

    case HANG_TIME_PAST: {
      const isHangComplete = state.runningHang.maxTime === action.payload;

      return {
        ...state,
        runningHang: {
          ...state.runningHang,
          currentTime: isHangComplete ? 0 : action.payload,
          lastHangTimeInSession: isHangComplete ? action.payload : state.runningHang.lastHangTimeInSession
        },
        currentSession: {
          start: state.currentSession.start,
          end: state.currentSession.end,
          hangs: isHangComplete && state.runningHang.start
            ? [...state.currentSession.hangs, {
                  start: state.runningHang.start.toISOString(),
                  end: new Date().toISOString()
                }
              ]
            : state.currentSession.hangs
        }
      };
    }

    case STOP_HANG: {
      const correctedEnd = new Date(+action.payload - state.settings.endTimeBuffer * 1000);
      if (!state.runningHang.start || correctedEnd < state.runningHang.start) {
        return {
          ...state,
          runningHang: {
            ...state.runningHang,
            currentTime: 0
          }
        };
      }

      const newHang: Hang = {
        start: state.runningHang.start.toISOString(),
        end: correctedEnd.toISOString()
      };

      const correctedRunTime = Math.round(Math.abs(+new Date(newHang.end) - +new Date(newHang.start)) / 1000);

      return {
        ...state,
        runningHang: {
          ...state.runningHang,
          lastHangTimeInSession: correctedRunTime,
          currentTime: 0
        },
        currentSession: {
          ...state.currentSession,
          hangs: [...state.currentSession.hangs, newHang]
        }
      };
    }

    case START_REST:
      return {
        ...state,
        display: 'Resting',
        resting: {
          currentTime: state.settings.pauseTime,
          totalRestTime: state.settings.pauseTime
        }
      };

    case REST_TIME_PAST: {
      let overlayText: string|null = null;
      switch (action.payload) {
        case 10:
        case 5:
        case 4:
        case 3:
          overlayText = action.payload + '...';
          break;
        case 2:
          overlayText = '2 seconds - get ready...';
          break;
        case 1:
          overlayText = '1 second - get ready...';
          break;
      }

      return {
        ...state,
        resting: {
          currentTime: action.payload,
          totalRestTime: state.resting.totalRestTime
        },
        overlayText
      };
    }

    case STOP_SESSION:
      return {
        ...state,
        display: 'SessionSummary',
        currentSession: {
          start: state.currentSession.start,
          end: new Date(),
          hangs: state.display === 'Running' && state.runningHang.start
            ? [...state.currentSession.hangs, {
                  start: state.runningHang.start.toISOString(),
                  end: new Date().toISOString()
                }
              ]
            : state.currentSession.hangs
        }
      };

    case SET_OVERLAY_TEXT: {
      return {
        ...state,
        overlayText: action.payload
      };
    }

    case SETTINGS_CHANGE:
      return {
        ...state,
        settings: action.payload
      };

    case SET_DEFAULT_HANG_ACTIVITY_SETTINGS:
      return {
        ...state,
        settings: { ...initialState.settings }
      };

    case SHOW_SESSION_SUMMARY:
      return {
        ...state,
        display: 'SessionSummary',
        currentSession: {
          ...state.currentSession,
          end: state.currentSession.end || new Date()
        }
      };

    default:
      return state;
  }
}
