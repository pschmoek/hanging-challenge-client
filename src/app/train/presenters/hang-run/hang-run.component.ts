import { Component, Input } from '@angular/core';
import { Hang } from '../../services/hang/hang';

@Component({
  selector: 'app-hang-run',
  templateUrl: './hang-run.component.html',
  styleUrls: ['./hang-run.component.less']
})
export class HangRunComponent {

  @Input() hang: Hang;
  @Input() indexInSession: number;

  get durationInSeconds(): number {
    return Math.round(Math.abs(+new Date(this.hang.end) - +new Date(this.hang.start)) / 1000);
  }

}
