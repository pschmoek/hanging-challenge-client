import { NgModule } from '@angular/core';

import { TrainComponent } from './containers/train/train.component';
import { TrainRoutingModule } from './train-routing.module';

export const COMPONENTS = [
  TrainComponent
];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
  imports: [TrainRoutingModule]
})
export class TrainModule { }
