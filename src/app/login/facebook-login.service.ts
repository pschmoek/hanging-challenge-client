import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';

import { Store } from '../store/store';

@Injectable()
export class FacebookLoginService {

  constructor(
    private store: Store
  ) { }

  init() {
    FB.init({ appId: '136337630400288', cookie: true, version: 'v2.11', xfbml: false });
    FB.getLoginStatus(this.onLoginStatus.bind(this));
    FB.Event.subscribe('auth.statusChange', this.onLoginStatus.bind(this));
  }

  private onLoginStatus(resp: fb.AuthResponse) {
    if (resp.status === 'connected' && resp.authResponse) {
      this.store.setFacebookToken(resp.authResponse.accessToken);
    } else {
      this.store.setFacebookToken(null);
    }
  }

}
