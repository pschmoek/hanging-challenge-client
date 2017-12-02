import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-train',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.less']
})
export class TrainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
