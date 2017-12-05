import { Component, Input } from '@angular/core';

import { Hang } from '../../services/hang/hang';

@Component({
  selector: 'app-todays-hang-time-section',
  templateUrl: './todays-hang-time-section.component.html',
  styleUrls: ['./todays-hang-time-section.component.less']
})
export class TodaysHangTimeSectionComponent {

  @Input() hangTime: number;
  @Input() hangCount: number;
  @Input() hangSeries: { name: string, value: number }[];

  view: any[] = [930, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;

  colorScheme = {
    domain: ['#5AA454']
  };

  // line, area
  autoScale = true;

  get chartData(): { name: string, series: { name: string, value: number }[] }[] {
    return [{
      name: 'Accumulated Hang Time',
      series: this.hangSeries
    }];
  }

}
