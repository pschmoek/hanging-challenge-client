import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { RunningHang } from '../../reducers/hang';

@Component({
  selector: 'app-running',
  templateUrl: './running.component.html',
  styleUrls: ['./running.component.less']
})
export class RunningComponent {

  @Input() runningHang: RunningHang;
  @Input() finishHangRunButtonEnabled: boolean;
  @Input() disableInteraction: boolean;
  @Output() finishHangRunButtonClick = new EventEmitter();
  @Output() keydownSpace = new EventEmitter();

  get currentInPercent(): number {
    return RunningComponent.getPercent(this.runningHang.currentTime, this.runningHang.maxTime);
  }

  get lastRunInPercent(): number {
    return RunningComponent.getPercent(this.runningHang.lastHangTimeInSession, this.runningHang.maxTime);
  }

  private static getPercent(current: number|null, max: number): number {
    if (!current) {
      return 0;
    }

    return Math.round(100 * current / max);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event && event.code === 'Space' && !this.disableInteraction) {
      this.keydownSpace.emit();
    }
  }

}
