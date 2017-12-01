import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { FacebookLoginService } from './facebook-login/facebook-login.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SplashComponent } from './splash/splash.component';
import { Store } from './store/store';
import { AuthService } from './auth/auth.service';

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
    RouterModule.forRoot(routes)
  ],
  providers: [Store, FacebookLoginService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
