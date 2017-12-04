import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';

import { TrainComponent } from './containers/train/train.component';
import { TrainRoutingModule } from './train-routing.module';
import { ReadyToStartComponent } from './presenters/ready-to-start/ready-to-start.component';
import { RestingComponent } from './presenters/resting/resting.component';
import { RunningComponent } from './presenters/running/running.component';
import { trainReducers } from './reducers/index';
import { SharedModule } from '../shared/shared.module';
import { HangEffects } from './effects/hang';
import { RestEffects } from './effects/rest';
import { HangService } from './services/hang/hang.service';
import { InitEffect } from './effects/init';
import { SessionSummaryComponent } from './presenters/session-summary/session-summary.component';
import { SaveSessionEffect } from './effects/save-session';

export const COMPONENTS = [
  TrainComponent,
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
    EffectsModule.forFeature([HangEffects, RestEffects, InitEffect, SaveSessionEffect])
  ],
  providers: [HangService]
})
export class TrainModule { }
