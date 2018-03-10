import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectPlayButtonText, AppState } from '../../reducers/index';
import {
  StartHangAction,
  SettingsChangeAction,
  StopHangAction,
  SetDefaultHangActivitySettings,
  SaveCurrentHangSessionAction,
  DiscardCurrentHangSessionAction,
  StopSessionAction
} from '../../actions/hang';
import { map } from 'rxjs/operators';
import { HangActivitySettings } from '../../reducers/hang';

@Component({
  selector: 'app-train',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.less']
})
export class TrainComponent {

  // dialog to show
  displayReadyToStart$ = this.store.select(s => s.train.hang.display).pipe(map(d => d === 'ReadyToStart'));
  displayRunning$ = this.store.select(s => s.train.hang.display).pipe(map(d => d === 'Running' || d === 'Resting'));
  displayResting$ = this.store.select(s => s.train.hang.display).pipe(map(d => d === 'Resting'));
  displaySessionSummary$ = this.store.select(s => s.train.hang.display).pipe(map(d => d === 'SessionSummary'));
  displaySessionOverview$ = this.store.select(s => s.train.hang).pipe(
    map(h => h.settings.autoStart && h.display === 'Running' || h.display === 'Resting')
  );
  // dialog data
  disableRunning$ = this.store.select(s => s.train.hang.display).pipe(map(d => d === 'Resting'));
  playButtonText$ = this.store.select(selectPlayButtonText);
  settings$ = this.store.select(s => s.train.hang.settings);
  runningHang$ = this.store.select(s => s.train.hang.runningHang);
  runningRest$ = this.store.select(s => s.train.hang.resting);
  session$ = this.store.select(s => s.train.hang.currentSession);

  constructor(private store: Store<AppState>) { }

  onPlayButtonClick() {
    this.store.dispatch(new StartHangAction({ showCountdown: true }));
  }

  onSettingsChange(settings: HangActivitySettings) {
    this.store.dispatch(new SettingsChangeAction(settings));
  }

  onSettingsToDefaultButtonClick() {
    this.store.dispatch(new SetDefaultHangActivitySettings());
  }

  onFinishHangRunButtonClick() {
    this.store.dispatch(new StopHangAction(new Date()));
  }

  onSaveSessionButtonClick() {
    this.store.dispatch(new SaveCurrentHangSessionAction());
  }

  onDiscardSessionButtonClick() {
    this.store.dispatch(new DiscardCurrentHangSessionAction());
  }

  onStopSessionButtonClick() {
    this.store.dispatch(new StopSessionAction());
  }

  onKeydownSpaceInRunning() {
    this.store.dispatch(new StopHangAction(new Date()));
  }

}
