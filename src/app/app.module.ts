import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Store } from './store/store';
import { TrainComponent } from './train/train.component';
import { ReadyToStartComponent } from './train/ready-to-start/ready-to-start.component';
import { CountDownComponent } from './train/count-down/count-down.component';
import { RunningComponent } from './train/running/running.component';
import { RestingComponent } from './train/resting/resting.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { AppComponent } from './core/containers/app/app.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TrainComponent,
    ReadyToStartComponent,
    CountDownComponent,
    RunningComponent,
    RestingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ routerReducer: routerReducer }),
    EffectsModule.forRoot([]),
    !environment.production
      ? StoreDevtoolsModule.instrument()
      : [],
    CoreModule
  ],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule { }
