import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './containers/app/app.component';
import { HeaderToolbarComponent } from './presenters/header-toolbar/header-toolbar.component';
import { SplashComponent } from './presenters/splash/splash.component';
import { FacebookLoginService } from './services/facebook/facebook-login.service';
import { FacebookLoginButtonComponent } from './presenters/facebook-login-button/facebook-login-button.component';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { AuthEffect } from './effects/auth';
import { HeaderNavLogoComponent } from './presenters/header-nav-logo/header-nav-logo.component';
import { HangService } from './services/hang/hang.service';
import { InitDashboardEffect } from './effects/init-dashboard';
import { TodaysHangTimeSectionComponent } from './presenters/todays-hang-time-section/todays-hang-time-section.component';

export const COMPONENTS = [
  AppComponent,
  HeaderToolbarComponent,
  SplashComponent,
  FacebookLoginButtonComponent,
  DashboardComponent,
  HeaderNavLogoComponent,
  TodaysHangTimeSectionComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    EffectsModule.forFeature([AuthEffect, InitDashboardEffect]),
    NgxChartsModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [FacebookLoginService, AuthService, UserService, HangService]
})
export class CoreModule { }
