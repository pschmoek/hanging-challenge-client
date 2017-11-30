import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { State } from './state';

export const defaultState: State = {
  facebookToken: null,
  facebookTokenInitialized: false
};

@Injectable()
export class Store {

  private stateSource = new BehaviorSubject<State>(defaultState);
  state$ = this.stateSource.asObservable();

  setFacebookToken(token: string|null) {
    this.stateSource.next({
      ...this.stateSource.getValue(),
      facebookTokenInitialized: true,
      facebookToken: token
    });
  }

}
