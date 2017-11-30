import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { BackendLoginService } from './login/backend-login.service';
import { FacebookLoginService } from './login/facebook-login.service';
import { Store } from './store/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  initialized$: Observable<boolean>;
  showFacebookLogin$: Observable<boolean>;

  constructor(
    private facebookLoginService: FacebookLoginService,
    private store: Store
  ) {
    this.facebookLoginService.init();
    this.initialized$ = this.store.state$.pipe(map(s => s.facebookTokenInitialized && !!s.facebookToken));
    this.showFacebookLogin$ = this.store.state$.pipe(map(s => s.facebookTokenInitialized && !s.facebookToken));
  }

}
