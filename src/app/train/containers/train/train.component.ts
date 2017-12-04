import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { TrainState, selectPlayButtonText } from '../../reducers/index';
import { StartHangAction, SettingsChangeAction, StopHangAction, SetDefaultHangActivitySettings } from '../../actions/hang';
import { map } from 'rxjs/operators';
import { RunningHang, RunningRest, HangSession, HangActivitySettings } from '../../reducers/hang';

@Component({
  selector: 'app-train',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.less']
})
export class TrainComponent implements OnInit {

  // dialog to show
  displayReadyToStart$: Observable<boolean>;
  displayRunning$: Observable<boolean>;
  displayResting$: Observable<boolean>;
  displaySessionSummary$: Observable<boolean>;
  // dialog data
  playButtonText$: Observable<string>;
  settings$: Observable<HangActivitySettings>;
  runningHang$: Observable<RunningHang>;
  runningRest$: Observable<RunningRest>;
  session$: Observable<HangSession>;

  constructor(private store: Store<TrainState>) { }

  ngOnInit() {
    // dialog to show
    this.displayReadyToStart$ = this.store.select(s => s.train.hang.display).pipe(map(d => d === 'ReadyToStart'));
    this.displayRunning$ = this.store.select(s => s.train.hang.display).pipe(map(d => d === 'Running'));
    this.displayResting$ = this.store.select(s => s.train.hang.display).pipe(map(d => d === 'Resting'));
    this.displaySessionSummary$ = this.store.select(s => s.train.hang.display).pipe(map(d => d === 'SessionSummary'));
    // dialog data
    this.playButtonText$ = this.store.select(selectPlayButtonText);
    this.settings$ = this.store.select(s => s.train.hang.settings);
    this.runningHang$ = this.store.select(s => s.train.hang.runningHang);
    this.runningRest$ = this.store.select(s => s.train.hang.resting);
    this.session$ = this.store.select(s => s.train.hang.currentSession);
  }

  onPlayButtonClick() {
    this.store.dispatch(new StartHangAction({ showCountdown: true }));
  }

  onSettingsChange(settings: HangActivitySettings) {
    this.store.dispatch(new SettingsChangeAction(settings));
  }

  onSettingsToDefaultButtonClick() {
    this.store.dispatch(new SetDefaultHangActivitySettings());
  }

  onAbordRun() {
    this.store.dispatch(new StopHangAction(new Date()));
  }

}
