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
import { SessionSummaryComponent } from './presenters/session-summary/session-summary.component';
import { SaveSessionEffect } from './effects/save-session';
import { SessionOverviewComponent } from './presenters/session-overview/session-overview.component';
import { HangRunComponent } from './presenters/hang-run/hang-run.component';
import { SessionToolbarComponent } from './presenters/session-toolbar/session-toolbar.component';
import { RouteToDashboardEffect } from './effects/route-to-dashboard';
import { HangSessionService } from './services/hang-session.service';

export const COMPONENTS = [
  TrainComponent,
  ReadyToStartComponent,
  RestingComponent,
  RunningComponent,
  SessionSummaryComponent,
  SessionOverviewComponent,
  HangRunComponent,
  SessionToolbarComponent
];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
  imports: [
    SharedModule,
    TrainRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('train', trainReducers),
    EffectsModule.forFeature([HangEffects, RestEffects, SaveSessionEffect, RouteToDashboardEffect])
  ],
  providers: [HangSessionService]
})
export class TrainModule { }
