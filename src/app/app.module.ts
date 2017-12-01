import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { FacebookLoginService } from './facebook-login/facebook-login.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SplashComponent } from './splash/splash.component';
import { Store } from './store/store';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  declarations: [
    AppComponent,
    FacebookLoginComponent,
    DashboardComponent,
    SplashComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [Store, FacebookLoginService, AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
