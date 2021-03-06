import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.less']
})
export class HeaderToolbarComponent {

  @Input() userName: string;
  @Input() currentUrl: string;
  @Output() titleClick = new EventEmitter();
  @Output() trainClick = new EventEmitter();
  @Output() analyzeClick = new EventEmitter();

}
