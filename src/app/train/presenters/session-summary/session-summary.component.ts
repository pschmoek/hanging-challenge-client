import { Component, Input } from '@angular/core';

import { HangSession } from '../../reducers/hang';

@Component({
  selector: 'app-session-summary',
  templateUrl: './session-summary.component.html',
  styleUrls: ['./session-summary.component.less']
})
export class SessionSummaryComponent {

  @Input() session: HangSession;

}
