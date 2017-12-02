import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrainComponent } from './containers/train/train.component';

export const routes: Routes = [
  { path: '', component: TrainComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainRoutingModule { }
