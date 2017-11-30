import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FacebookLoginComponent } from './login/facebook-login.component';
import { FacebookLoginService } from './login/facebook-login.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BackendLoginService } from './login/backend-login.service';
import { SplashComponent } from './splash/splash.component';
import { Store } from './store/store';

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
  providers: [Store, FacebookLoginService, BackendLoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
