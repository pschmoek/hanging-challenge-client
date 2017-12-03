import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';

import { TrainComponent } from './containers/train/train.component';
import { TrainRoutingModule } from './train-routing.module';
import { CountDownComponent } from './presenters/count-down/count-down.component';
import { ReadyToStartComponent } from './presenters/ready-to-start/ready-to-start.component';
import { RestingComponent } from './presenters/resting/resting.component';
import { RunningComponent } from './presenters/running/running.component';
import { trainReducers } from './reducers/index';
import { SharedModule } from '../shared/shared.module';
import { HangEffects } from './effects/hang';
import { RestEffects } from './effects/rest';
import { SaveNewHangEffect } from './effects/save-new-hang';
import { HangService } from './services/hang/hang.service';
import { InitEffect } from './effects/init';
import { SessionSummaryComponent } from './presenters/session-summary/session-summary.component';

export const COMPONENTS = [
  TrainComponent,
  CountDownComponent,
  ReadyToStartComponent,
  RestingComponent,
  RunningComponent,
  SessionSummaryComponent
];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
  imports: [
    SharedModule,
    TrainRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('train', trainReducers),
    EffectsModule.forFeature([HangEffects, RestEffects, InitEffect, SaveNewHangEffect])
  ],
  providers: [HangService]
})
export class TrainModule { }
