import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resting',
  templateUrl: './resting.component.html',
  styleUrls: ['./resting.component.less']
})
export class RestingComponent {

  @Input() restingTime: number;
  @Input() currentTime: number|null;

}
