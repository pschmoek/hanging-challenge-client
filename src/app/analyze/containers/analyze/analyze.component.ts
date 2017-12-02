import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-analyze',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.less']
})
export class AnalyzeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
