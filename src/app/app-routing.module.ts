import { RouterModule, Routes, PreloadAllModules, Params, RouterStateSnapshot } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { DashboardComponent } from './core/containers/dashboard/dashboard.component';

/**
 * Temporary bug fix for redux dev tools slowing down with large router payload.
 * see https://github.com/ngrx/platform/blob/master/docs/router-store/api.md#custom-router-state-serializer
 * and https://github.com/angular/angular/pull/20289
 */

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams } } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}

export const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'analyze', loadChildren: () => import('./analyze/analyze.module').then(m => m.AnalyzeModule) },
  { path: 'train', loadChildren: () => import('./train/train.module').then(m => m.TrainModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' })
  ],
  exports: [RouterModule],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ]
})
export class AppRoutingModule { }
