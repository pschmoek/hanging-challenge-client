import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { State } from './state';

export const defaultState: State = { };

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

  setJwt(token: string|null) {
    this.stateSource.next({
      ...this.stateSource.getValue(),
      jwt: token
    });
  }

}
