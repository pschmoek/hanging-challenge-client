import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todays-hang-time-section',
  templateUrl: './todays-hang-time-section.component.html',
  styleUrls: ['./todays-hang-time-section.component.less']
})
export class TodaysHangTimeSectionComponent {

  @Input() hangTime = 0;
  @Input() hangCount = 0;
  @Input() hangSeries: { name: string, value: number }[] = [];

  get chartData(): { name: string, series: { name: string, value: number }[] }[] {
    return [{
      name: 'Accumulated Hang Time',
      series: this.hangSeries
    }];
  }

  get summaryText(): string {
    if (this.hangCount === 0) {
      return 'No recorded hangs today.';
    }

    let timeText = '';
    if (this.hangTime < 60) {
      timeText = this.hangTime + 's';
    } else {
      timeText = Math.round(this.hangTime / 60) + 'min and ' + this.hangTime % 60 + 's';
    }

    return `You spent ${timeText} with ${this.hangCount } attempts hanging today.`;
  }

}
