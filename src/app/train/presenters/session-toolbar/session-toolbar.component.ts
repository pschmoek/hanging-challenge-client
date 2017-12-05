import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-session-toolbar',
  templateUrl: './session-toolbar.component.html',
  styleUrls: ['./session-toolbar.component.less']
})
export class SessionToolbarComponent {

  @Output() stopSessionButtonClick = new EventEmitter();

}
