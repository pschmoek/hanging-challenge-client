import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState, selectTodaysHangSeries } from '../../../root-reducer';
import { Observable } from 'rxjs/Observable';
import { DashboardState } from '../../reducers/dashboard';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  todaysHangCount$: Observable<number>;
  todaysHangTime$: Observable<number>;
  todaysHangSeries$: Observable<{ name: string, value: number }[]>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.todaysHangCount$ = this.store.select(s => s.dashboard.todaysHangCount);
    this.todaysHangTime$ = this.store.select(s => s.dashboard.todaysHangTime);
    this.todaysHangSeries$ = this.store.select(selectTodaysHangSeries);
  }

}
