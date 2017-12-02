import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnalyzeComponent } from './containers/analyze/analyze.component';

export const routes: Routes = [
  { path: '', component: AnalyzeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyzeRoutingModule { }
