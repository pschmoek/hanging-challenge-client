import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState, selectTodaysHangSeries } from '../../../root-reducer';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent {

  showChart$ = this.store.select(s => !s.dashboard.isLoadingHangTime);
  showLoadingNotification$ = this.store.select(s => s.dashboard.isLoadingHangTime);
  todaysHangCount$ = this.store.select(s => s.dashboard.todaysHangCount);
  todaysHangTime$ = this.store.select(s => s.dashboard.todaysHangTime);
  todaysHangSeries$ = this.store.select(selectTodaysHangSeries);

  constructor(
    private store: Store<AppState>
  ) { }

}
