import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-running',
  templateUrl: './running.component.html',
  styleUrls: ['./running.component.less']
})
export class RunningComponent implements OnInit {

  @Input() maxTime: number;
  @Input() currentTime: number|null;

  constructor() { }

  ngOnInit() {
  }

  get widthInPercent(): number {
    if (!this.currentTime) {
      return 0;
    }

    return Math.round(this.currentTime / this.maxTime);
  }

}
