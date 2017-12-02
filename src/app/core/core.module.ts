import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './containers/app/app.component';
import { HeaderToolbarComponent } from './presenters/header-toolbar/header-toolbar.component';
import { SplashComponent } from './presenters/splash/splash.component';
import { FacebookLoginService } from './services/facebook/facebook-login.service';
import { FacebookLoginButtonComponent } from './presenters/facebook-login-button/facebook-login-button.component';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { DashboardComponent } from './containers/dashboard/dashboard.component';

export const COMPONENTS = [
  AppComponent,
  HeaderToolbarComponent,
  SplashComponent,
  FacebookLoginButtonComponent,
  DashboardComponent
];

@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [FacebookLoginService, AuthService, UserService]
})
export class CoreModule { }
