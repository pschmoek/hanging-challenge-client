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
import { HangService } from './hang/hang.service';
import { HangActivityComponent } from './hang/hang-activity.component';
import { TrainComponent } from './train/train.component';
import { AnalyzeComponent } from './analyze/analyze.component';
import { HeaderToolbarComponent } from './header-toolbar/header-toolbar.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'analyze', component: AnalyzeComponent },
  { path: 'train', component: TrainComponent },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  declarations: [
    AppComponent,
    FacebookLoginComponent,
    DashboardComponent,
    SplashComponent,
    HangActivityComponent,
    TrainComponent,
    AnalyzeComponent,
    HeaderToolbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [Store, FacebookLoginService, AuthService, UserService, HangService],
  bootstrap: [AppComponent]
})
export class AppModule { }
