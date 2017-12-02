import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent {

  constructor(
    private router: Router
  ) { }

  onAnalyzeClick() {
    this.router.navigate(['analyze']);
  }

  onTrainClick() {
    this.router.navigate(['train']);
  }

}
