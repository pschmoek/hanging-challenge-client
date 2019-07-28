import { Action } from '@ngrx/store';

import { HangActivitySettings } from '../reducers/hang';
import { Hang } from '../../core/services/hang/hang';
import { HangSession } from '../services/hang-session';

export const LOAD_TODAYS_HANGS = '[Hang] Load Todays Hangs';
export const LOAD_TODAYS_HANGS_SUCCESS = '[Hang] Load Todays Hangs Success';
export const SAVE_CURRENT_HANG_SESSION = '[Hang] Save Current Hang Session';
export const SAVE_CURRENT_HANG_SESSION_SUCCESS = '[Hang] Save Current Hang Session Success';
export const DISCARD_CURRENT_HANG_SESSION = '[Hang] Discard Current Hang Session';
export const START_HANG = '[Hang] Start Hang';
export const HANG_TIME_PAST = '[Hang] Hang Time Past';
export const STOP_HANG = '[Hang] Stop Hang';
export const START_REST = '[Hang] Start Rest';
export const REST_TIME_PAST = '[Hang] Rest Time Past';
export const STOP_SESSION = '[Hang] Stop Session';
export const SET_OVERLAY_TEXT = '[Hang] Set Overlay Text';
export const SETTINGS_CHANGE = '[Hang] Settings Change';
export const SET_DEFAULT_HANG_ACTIVITY_SETTINGS = '[Hang] Set Default Hang Activity Settings';
export const SHOW_SESSION_SUMMARY = '[Hang] Show Session Summary';
export const COUNTDOWN_TIME_PAST = '[Hang] Countdown Time Past';

export class LoadTodaysHangsAction implements Action {
  readonly type = LOAD_TODAYS_HANGS;
}

export class LoadTodaysHangsSuccessAction implements Action {
  readonly type = LOAD_TODAYS_HANGS_SUCCESS;

  constructor(public payload: Hang[]) { }
}

export class SaveCurrentHangSessionAction implements Action {
  readonly type = SAVE_CURRENT_HANG_SESSION;
}

export class SaveCurrentHangSessionSuccessAction implements Action {
  readonly type = SAVE_CURRENT_HANG_SESSION_SUCCESS;

  constructor(public payload: HangSession) { }
}

export class DiscardCurrentHangSessionAction implements Action {
  readonly type = DISCARD_CURRENT_HANG_SESSION;
}

export class StartHangAction implements Action {
  readonly type = START_HANG;

  constructor(public payload: { showCountdown: boolean }) { }
}

export class HangTimePastAction implements Action {
  readonly type = HANG_TIME_PAST;

  constructor(public payload: number) { }
}

export class StopHangAction implements Action {
  readonly type = STOP_HANG;

  constructor(public payload: Date) { }
}

export class StartRestAction implements Action {
  readonly type = START_REST;
}

export class RestTimePastAction implements Action {
  readonly type = REST_TIME_PAST;

  constructor(public payload: number) { }
}

export class StopSessionAction implements Action {
  readonly type = STOP_SESSION;
}

export class SetOverlayTextAction implements Action {
  readonly type = SET_OVERLAY_TEXT;

  constructor(public payload: string) { }
}

export class SettingsChangeAction implements Action {
  readonly type = SETTINGS_CHANGE;

  constructor(public payload: HangActivitySettings) { }
}

export class SetDefaultHangActivitySettings implements Action {
  readonly type = SET_DEFAULT_HANG_ACTIVITY_SETTINGS;
}

export class ShowSessionSummary implements Action {
  readonly type = SHOW_SESSION_SUMMARY;
}

export class CountdownTimePastAction implements Action {
  readonly type = COUNTDOWN_TIME_PAST;

  constructor(public payload: { secondsLeft: number }) { }
}

export type HangActions = LoadTodaysHangsAction
                        | LoadTodaysHangsSuccessAction
                        | SaveCurrentHangSessionAction
                        | SaveCurrentHangSessionSuccessAction
                        | DiscardCurrentHangSessionAction
                        | StartHangAction
                        | HangTimePastAction
                        | StopHangAction
                        | StartRestAction
                        | RestTimePastAction
                        | StopSessionAction
                        | SetOverlayTextAction
                        | SettingsChangeAction
                        | SetDefaultHangActivitySettings
                        | ShowSessionSummary
                        | CountdownTimePastAction;
