import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

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

