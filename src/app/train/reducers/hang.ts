import { HangActivitySettings } from './hang-activity-settings';
import { Hang } from '../services/hang/hang';
import {
  HangActions,
  LOAD_HANGS,
  LOAD_HANGS_SUCCESS,
  SAVE_HANG,
  SAVE_HANG_SUCCESS,
  START_HANG,
  HANG_TIME_PAST,
  HANG_COMPLETE,
  REST_TIME_PAST,
  REST_COMPLETE,
  OVERLAY_UPDATE,
  SETTINGS_CHANGE
} from '../actions/hang';

export interface HangState {
  isLoadingHangs: boolean;
  isSavingHangStartedAt: string|null;
  isHangRunning: boolean;
  isResting: boolean;
  isReadyToStart: boolean;
  overlayText: string|null;
  settings: HangActivitySettings;
  hangs: Hang[];
  todaysHangs: Hang[];
  currentHangTime: number|null;
  currentRestTime: number|null;
  consecutiveHangs: number;
}

export const defaultSettings: HangActivitySettings = {
  autoStart: true,
  countdown: 5,
  endTimeBuffer: 3,
  maxPerRepetition: 5, // 60
  pauseTime: 5 // 60
};

export const initialState: HangState = {
  isLoadingHangs: false,
  settings: defaultSettings,
  isSavingHangStartedAt: null,
  overlayText: null,
  isHangRunning: false,
  isReadyToStart: true,
  isResting: false,
  hangs: [],
  todaysHangs: [],
  currentHangTime: null,
  currentRestTime: null,
  consecutiveHangs: 0
};

export function reducer(state = initialState, action: HangActions): HangState {
  switch (action.type) {
    case LOAD_HANGS:
      return {
        ...state,
        isLoadingHangs: true
      };

    case LOAD_HANGS_SUCCESS: {
      const today = new Date().toDateString();
      const todaysHangs = action.payload.filter(h => new Date(h.start).toDateString() === today);

      return {
        ...state,
        isLoadingHangs: false,
        hangs: action.payload,
        todaysHangs
      };
    }

    case SAVE_HANG: {
      return {
        ...state,
        isSavingHangStartedAt: action.payload.start
      };
    }

    case SAVE_HANG_SUCCESS: {
      const hangToUpdate = state.hangs.find(h => h.start === action.payload.start);
      const updatedHangs = [...state.hangs.filter(h => h.start !== action.payload.start), action.payload];
      const today = new Date().toDateString();
      const todaysHangs = updatedHangs.filter(h => new Date(h.start).toDateString() === today);

      return {
        ...state,
        isSavingHangStartedAt: null,
        hangs: updatedHangs,
        todaysHangs
      };
    }

    case START_HANG:
      return {
        ...state,
        isHangRunning: true,
        isReadyToStart: false,
        isResting: false,
        currentHangTime: 0
      };

    case HANG_TIME_PAST:
      return {
        ...state,
        currentHangTime: action.payload,
        overlayText: null
      };

    case HANG_COMPLETE:
      return {
        ...state,
        hangs: [...state.hangs, action.payload],
        todaysHangs: [...state.todaysHangs, action.payload],
        isHangRunning: false,
        isResting: state.settings.autoStart,
        isReadyToStart: !state.settings.autoStart,
        consecutiveHangs: state.settings.autoStart ? state.consecutiveHangs + 1 : 0,
        currentRestTime: state.settings.autoStart ? state.settings.pauseTime : null
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
        currentRestTime: action.payload,
        overlayText
      };
    }

    case REST_COMPLETE:
      return {
        ...state,
        overlayText: 'GO!',
        isResting: false,
        isHangRunning: true,
        isReadyToStart: false,
        currentHangTime: 0
      };

    case OVERLAY_UPDATE: {
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

    default:
      return state;
  }
}
