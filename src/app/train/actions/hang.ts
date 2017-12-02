import { Action } from '@ngrx/store';

import { Hang } from '../services/hang/hang';

export const LOAD_HANGS = '[Hang] Load Hangs';
export const LOAD_HANGS_SUCCESS = '[Hang] Load Hangs Success';
export const SAVE_HANG = '[Hang] Save Hang';
export const SAVE_HANG_SUCCESS = '[Hang] Save Hang Success';
export const START_HANG = '[Hang] Start Hang';
export const HANG_TIME_PAST = '[Hang] Hang Time Past';
export const HANG_COMPLETE = '[Hang] Hang Complete';
export const REST_TIME_PAST = '[Hang] Rest Time Past';
export const REST_COMPLETE = '[Hang] Rest Complete';
export const OVERLAY_UPDATE = '[Hang] Overlay Update';

export class LoadHangsAction implements Action {
  readonly type = LOAD_HANGS;
}

export class LoadHangsSuccessAction implements Action {
  readonly type = LOAD_HANGS_SUCCESS;

  constructor(public payload: Hang[]) { }
}

export class SaveHangAction implements Action {
  readonly type = SAVE_HANG;

  constructor(public payload: Hang) { }
}

export class SaveHangSuccessAction implements Action {
  readonly type = SAVE_HANG_SUCCESS;

  constructor(public payload: Hang) { }
}

export class StartHangAction implements Action {
  readonly type = START_HANG;
}

export class HangTimePastAction implements Action {
  readonly type = HANG_TIME_PAST;

  constructor(public payload: number) { }
}

export class HangCompleteAction implements Action {
  readonly type = HANG_COMPLETE;

  constructor(public payload: Hang) { }
}

export class RestTimePastAction implements Action {
  readonly type = REST_TIME_PAST;

  constructor(public payload: number) { }
}

export class RestCompleteAction implements Action {
  readonly type = REST_COMPLETE;
}

export class OverlayUpdateAction implements Action {
  readonly type = OVERLAY_UPDATE;

  constructor(public payload: string) { }
}

export type HangActions = LoadHangsAction
                        | LoadHangsSuccessAction
                        | SaveHangAction
                        | SaveHangSuccessAction
                        | StartHangAction
                        | HangTimePastAction
                        | HangCompleteAction
                        | RestTimePastAction
                        | RestCompleteAction
                        | OverlayUpdateAction;
