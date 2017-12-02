import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { FacebookTokenReceived } from '../../actions/auth';
import { AppState } from '../../../root-reducer';

@Injectable()
export class FacebookLoginService {

  constructor(
    private store: Store<AppState>
  ) { }

  init() {
    FB.init({ appId: '136337630400288', cookie: true, version: 'v2.11', xfbml: false });
    FB.getLoginStatus(() => {});
    FB.Event.subscribe('auth.statusChange', this.onLoginStatus.bind(this));
  }

  private onLoginStatus(resp: fb.AuthResponse) {
    if (resp.status === 'connected' && resp.authResponse) {
      this.store.dispatch(new FacebookTokenReceived(resp.authResponse.accessToken));
    } else {
      this.store.dispatch(new FacebookTokenReceived(null));
    }
  }

}
