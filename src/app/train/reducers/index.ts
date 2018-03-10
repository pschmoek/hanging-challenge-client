import { createSelector, ActionReducerMap, ActionReducer, createFeatureSelector } from '@ngrx/store';

import { HangState, reducer } from './hang';
import { AppState } from '../../root-reducer';

export interface AppState extends AppState {
  train: TrainState;
}

export interface TrainState {
  hang: HangState;
}

export const trainReducers: ActionReducerMap<TrainState> = {
  hang: reducer as ActionReducer<HangState>
};

export const getTrainState = createFeatureSelector<TrainState>('train');

export const selectPlayButtonText = createSelector(
  getTrainState,
  state => state.hang.settings.autoStart ? 'Start Hang Training' : 'Start Single Hang'
);
