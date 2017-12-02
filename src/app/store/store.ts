import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { State } from './state';
import { HangActivitySettings } from './hang-activity-settings';
import { Hang } from '../hang/hang';
import { User } from '../core/services/user/user';

export const defaultSettings: HangActivitySettings = {
  accumulatedDailyTarget: 600,
  autoStart: true,
  countdown: 5,
  endTimeBuffer: 3,
  maxPerRepetition: 60,
  pauseTime: 60
};

export const defaultState: State = {
  facebookToken: null,
  hangActivitySettings: defaultSettings,
  hangs: [],
  todaysHangs: [],
  isLoadingHangs: false
};

@Injectable()
export class Store {

  private stateSource = new BehaviorSubject<State>(defaultState);
  state$ = this.stateSource.asObservable();

  setFacebookToken(token: string|null) {
    this.stateSource.next({
      ...this.stateSource.getValue(),
      facebookToken: token
    });
  }

  setJwt(token: string) {
    this.stateSource.next({
      ...this.stateSource.getValue(),
      jwt: token
    });
  }

  setUser(user: User) {
    this.stateSource.next({
      ...this.stateSource.getValue(),
      userName: user.userName
    });
  }

  setIsLoadingHangs(isLoading: boolean) {
    this.stateSource.next({
      ...this.stateSource.getValue(),
      isLoadingHangs: isLoading
    });
  }

  setHangs(hangs: Hang[]) {
    const today = new Date().toDateString();
    const todaysHangs = hangs.filter(h => new Date(h.start).toDateString() === today);
    this.stateSource.next({
      ...this.stateSource.getValue(),
      hangs,
      todaysHangs
    });
  }

}
