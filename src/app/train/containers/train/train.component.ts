import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { TrainState, selectPlayButtonText } from '../../reducers/index';
import { StartHangAction, SettingsChangeAction } from '../../actions/hang';
import { HangActivitySettings } from '../../reducers/hang-activity-settings';

@Component({
  selector: 'app-train',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.less']
})
export class TrainComponent implements OnInit {

  isReadyToStart$: Observable<boolean>;
  isRunning$: Observable<boolean>;
  isResting$: Observable<boolean>;
  maxRunningTime$: Observable<number>;
  currentHangTime$: Observable<number|null>;
  restingTime$: Observable<number>;
  currentRestingTime$: Observable<number|null>;
  playButtonText$: Observable<string>;
  settings$: Observable<HangActivitySettings>;

  constructor(private store: Store<TrainState>) { }

  ngOnInit() {
    this.isReadyToStart$ = this.store.select(s => s.train.hang.isReadyToStart);
    this.isRunning$ = this.store.select(s => s.train.hang.isHangRunning);
    this.maxRunningTime$ = this.store.select(s => s.train.hang.settings.maxPerRepetition);
    this.currentHangTime$ = this.store.select(s => s.train.hang.currentHangTime);
    this.isResting$ = this.store.select(s => s.train.hang.isResting);
    this.restingTime$ = this.store.select(s => s.train.hang.settings.pauseTime);
    this.currentRestingTime$ = this.store.select(s => s.train.hang.currentRestTime);
    this.playButtonText$ = this.store.select(selectPlayButtonText);
    this.settings$ = this.store.select(s => s.train.hang.settings);
  }

  onPlayButtonClick() {
    this.store.dispatch(new StartHangAction());
  }

  onSettingsChange(settings: HangActivitySettings) {
    this.store.dispatch(new SettingsChangeAction(settings));
  }

}
