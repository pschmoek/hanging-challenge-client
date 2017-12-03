import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { HangState, reducer } from './hang';
import { AppState } from '../../root-reducer';

export interface TrainState extends AppState {
  train: {
    hang: HangState;
  };
}

export const trainReducers = {
  hang: reducer
};

export const selectPlayButtonText = createSelector((state: TrainState) => state.train.hang.settings,
  s => s.autoStart ? 'Start Session' : 'Start Hang');
