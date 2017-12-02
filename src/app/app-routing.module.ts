import { RouterModule, Routes, RouterStateSnapshot } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreRouterConnectingModule, routerReducer, RouterStateSerializer } from '@ngrx/router-store';

import { DashboardComponent } from './dashboard/dashboard.component';

/*
 * Workaround https://github.com/ngrx/platform/pull/188
 * Memory bug in redux dev tools - router state too large
 * ... will be fixed in later version of ngrx
 */

export interface RouterStateUrl {
  url: string;
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const url = routerState ? routerState.url : '';

    // Only return an object including the URL
    // instead of the entire snapshot
    return { url };
  }
}

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'analyze', loadChildren: './analyze/analyze.module#AnalyzeModule' },
  { path: 'train', loadChildren: './train/train.module#TrainModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), StoreRouterConnectingModule],
  exports: [RouterModule],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ]
})
export class AppRoutingModule { }
