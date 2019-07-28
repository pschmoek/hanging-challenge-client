import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { FacebookTokenReceived } from '../../actions/auth';
import { AppState } from '../../../root-reducer';
import { environment } from '../../../../environments/environment';

@Injectable()
export class FacebookLoginService {

  constructor(
    private store: Store<AppState>
  ) { }

  init() {
    FB.init({ appId: environment.facebookAppId, cookie: true, version: 'v3.3', xfbml: false });
    FB.getLoginStatus(() => {});
    FB.Event.subscribe('auth.statusChange', this.onLoginStatus.bind(this));
  }

  private onLoginStatus(resp: fb.StatusResponse) {
    if (resp.status === 'connected' && resp.authResponse) {
      this.store.dispatch(new FacebookTokenReceived(resp.authResponse.accessToken));
    } else {
      this.store.dispatch(new FacebookTokenReceived(null));
    }
  }

}
