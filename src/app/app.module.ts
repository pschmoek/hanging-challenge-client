import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { FacebookLoginService } from './facebook-login/facebook-login.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SplashComponent } from './splash/splash.component';
import { Store } from './store/store';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { HangService } from './hang/hang.service';
import { HangActivityComponent } from './hang/hang-activity.component';
import { TrainComponent } from './train/train.component';
import { AnalyzeComponent } from './analyze/analyze.component';
import { HeaderToolbarComponent } from './header-toolbar/header-toolbar.component';
import { ReadyToStartComponent } from './train/ready-to-start/ready-to-start.component';
import { CountDownComponent } from './train/count-down/count-down.component';
import { RunningComponent } from './train/running/running.component';
import { RestingComponent } from './train/resting/resting.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    FacebookLoginComponent,
    DashboardComponent,
    SplashComponent,
    HangActivityComponent,
    TrainComponent,
    AnalyzeComponent,
    HeaderToolbarComponent,
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
  ],
  providers: [Store, FacebookLoginService, AuthService, UserService, HangService],
  bootstrap: [AppComponent]
})
export class AppModule { }
