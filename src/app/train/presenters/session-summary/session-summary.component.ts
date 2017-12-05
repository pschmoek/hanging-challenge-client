import { Component, Input, Output, EventEmitter } from '@angular/core';

import { HangSession } from '../../reducers/hang';

@Component({
  selector: 'app-session-summary',
  templateUrl: './session-summary.component.html',
  styleUrls: ['./session-summary.component.less']
})
export class SessionSummaryComponent {

  @Input() session: HangSession;
  @Output() saveSessionButtonClick = new EventEmitter();
  @Output() discardSessionButtonClick = new EventEmitter();

}
