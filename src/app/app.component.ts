import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { first, filter } from 'rxjs/operators';

import { FacebookLoginService } from './facebook-login/facebook-login.service';
import { Store } from './store/store';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { HangService } from './hang/hang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  showApp$: Observable<boolean>;
  showSplash$: Observable<boolean>;
  showFacebookLogin$: Observable<boolean>;
  userName$: Observable<string|undefined>;

  constructor(
    private facebookLoginService: FacebookLoginService,
    private authService: AuthService,
    private userService: UserService,
    private hangService: HangService,
    private store: Store
  ) {
    this.facebookLoginService.init();
  }

  ngOnInit() {
    this.showApp$ = this.store.state$.pipe(
      map(s => !!s.jwt)
    );
    this.showSplash$ = this.store.state$.pipe(
      map(s => !s.jwt)
    );
    this.showFacebookLogin$ = this.store.state$.pipe(
      map(s => !s.facebookToken)
    );
    this.userName$ = this.store.state$.pipe(
      map(s => s.userName)
    );
    this.store.state$.pipe(
      map(s => s.facebookToken),
      filter(token => token != null),
      first()
    ).subscribe((token: string) => {
      this.authService.obtainJwt(token);
      this.userService.loadUser();
      this.hangService.initHangs();
    });
  }

}
