import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { first, filter } from 'rxjs/operators';

import { FacebookLoginService } from './facebook-login/facebook-login.service';
import { Store } from './store/store';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  showApp$: Observable<boolean>;
  showSplash$: Observable<boolean>;
  showFacebookLogin$: Observable<boolean>;

  constructor(
    private facebookLoginService: FacebookLoginService,
    private authService: AuthService,
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
    this.store.state$.pipe(
      map(s => s.facebookToken),
      filter(token => token != null),
      first()
    ).subscribe((token: string) => {
      this.authService.obtainJwt(token);
    });
  }

}
