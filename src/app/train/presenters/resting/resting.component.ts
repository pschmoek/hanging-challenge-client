import { Component, Input } from '@angular/core';

import { RunningRest } from '../../reducers/hang';

@Component({
  selector: 'app-resting',
  templateUrl: './resting.component.html',
  styleUrls: ['./resting.component.less']
})
export class RestingComponent {

  @Input() runningRest: RunningRest;

  get widthInPercent(): number {
    if (!this.runningRest.currentTime) {
      return 100;
    }

    return Math.round(100 * this.runningRest.currentTime / this.runningRest.totalRestTime);
  }

}
