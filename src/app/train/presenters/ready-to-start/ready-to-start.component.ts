import { Component, Output, EventEmitter } from '@angular/core';
import {  } from '@angular/core/src/event_emitter';

@Component({
  selector: 'app-ready-to-start',
  templateUrl: './ready-to-start.component.html',
  styleUrls: ['./ready-to-start.component.less']
})
export class ReadyToStartComponent {

  @Output() playButtonClick = new EventEmitter();

}

// rgba(0, 0, 0, 0.85);
//    color: rgb(232, 232, 232);
