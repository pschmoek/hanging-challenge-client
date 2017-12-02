import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core';
import { map } from 'rxjs/operators/map';

import { Store } from '../../store/store';
import { HangActivitySettings } from '../../store/hang-activity-settings';

@Component({
  selector: 'app-hang-activity',
  templateUrl: './hang-activity.component.html'
})
export class HangActivityComponent implements OnInit {

  playButtonText$: Observable<string>;
  settings$: Observable<HangActivitySettings>;

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.playButtonText$ = this.store.state$.pipe(
      map(s => s.hangActivitySettings.autoStart
        ? 'Start Hang Reps'
        : 'Start Single Hang')
    );
    this.settings$ = this.store.state$.pipe(
      map(s => s.hangActivitySettings)
    );
  }

  onPlayButtonClick() {

  }

}
