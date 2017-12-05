import { Component, Input } from '@angular/core';
import { HangSession } from '../../reducers/hang';

@Component({
  selector: 'app-session-overview',
  templateUrl: './session-overview.component.html',
  styleUrls: ['./session-overview.component.less']
})
export class SessionOverviewComponent {

  @Input() session: HangSession;

  get sessionSumInSeconds(): number {
    return this.session.hangs.reduce((pre, cur) => pre + Math.round(Math.abs(+new Date(cur.end) - +new Date(cur.start)) / 1000), 0);
  }

}
