import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HangActivitySettings } from '../../reducers/hang-activity-settings';

@Component({
  selector: 'app-ready-to-start',
  templateUrl: './ready-to-start.component.html',
  styleUrls: ['./ready-to-start.component.less']
})
export class ReadyToStartComponent implements OnInit, OnChanges {

  @Input() playbuttonText: string;
  @Input() settings: HangActivitySettings;
  @Output() playButtonClick = new EventEmitter();
  @Output() settingsChange = new EventEmitter<HangActivitySettings>();

  settingsForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.settingsForm = this.fb.group({
      maxPerRepetition: [this.settings.maxPerRepetition, [Validators.required]],
      autoStart: this.settings.autoStart,
      pauseTime: [this.settings.pauseTime, Validators.required],
      endTimeBuffer: [this.settings.endTimeBuffer, Validators.required],
      countdown: [this.settings.countdown, Validators.required]
    });

    this.settingsForm.valueChanges.subscribe(v => {
      if (this.settingsForm.valid) {
        this.settingsChange.emit(v);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.settings && !changes.settings.isFirstChange()) {
      this.settingsForm.patchValue(this.settings);
    }
  }

}
