import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TrainComponent } from './containers/train/train.component';
import { TrainRoutingModule } from './train-routing.module';
import { CountDownComponent } from './presenters/count-down/count-down.component';
import { ReadyToStartComponent } from './presenters/ready-to-start/ready-to-start.component';
import { RestingComponent } from './presenters/resting/resting.component';
import { RunningComponent } from './presenters/running/running.component';
import { trainReducers } from './reducers/index';
import { SharedModule } from '../shared/shared.module';
import { HangEffects } from './effects/hang';

export const COMPONENTS = [
  TrainComponent,
  CountDownComponent,
  ReadyToStartComponent,
  RestingComponent,
  RunningComponent
];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
  imports: [
    SharedModule,
    TrainRoutingModule,
    StoreModule.forFeature('train', trainReducers),
    EffectsModule.forFeature([HangEffects])
  ],
  providers: []
})
export class TrainModule { }
