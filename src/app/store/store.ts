import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { State } from './state';
import { User } from '../user/user';

export const defaultState: State = {
  facebookToken: null
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

}
