import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { TrainState } from '../../reducers/index';
import { StartHangAction } from '../../actions/hang';

@Component({
  selector: 'app-train',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.less']
})
export class TrainComponent implements OnInit {

  isReadyToStart$: Observable<boolean>;
  isRunning$: Observable<boolean>;
  maxRunningTime$: Observable<number>;
  currentHangTime$: Observable<number|null>;

  constructor(private store: Store<TrainState>) { }

  ngOnInit() {
    this.isReadyToStart$ = this.store.select(s => s.train.hang.isReadyToStart);
    this.isRunning$ = this.store.select(s => s.train.hang.isHangRunning);
    this.maxRunningTime$ = this.store.select(s => s.train.hang.settings.maxPerRepetition);
    this.currentHangTime$ = this.store.select(s => s.train.hang.currentHangTime);
  }

  onPlayButtonClick() {
    this.store.dispatch(new StartHangAction());
  }

}
