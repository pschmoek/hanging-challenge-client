import { NgModule } from '@angular/core';

import { AnalyzeComponent } from './containers/analyze/analyze.component';
import { AnalyzeRoutingModule } from './analyze-routing.module';

export const COMPONENTS = [
  AnalyzeComponent
];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
  imports: [AnalyzeRoutingModule]
})
export class AnalyzeModule { }
