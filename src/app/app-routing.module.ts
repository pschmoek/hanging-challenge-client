import { RouterModule, Routes, PreloadAllModules, Params, RouterStateSnapshot } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';

import { DashboardComponent } from './core/containers/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'analyze', loadChildren: () => import('./analyze/analyze.module').then(m => m.AnalyzeModule) },
  { path: 'train', loadChildren: () => import('./train/train.module').then(m => m.TrainModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
