import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { first, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { FacebookLoginService } from '../../services/facebook/facebook-login.service';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import * as fromAuth from '../../reducers/auth';
import * as auth from '../../actions/auth';
import { AppState } from '../../../root-reducer';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  showApp$: Observable<boolean>;
  showSplash$: Observable<boolean>;
  showFacebookLogin$: Observable<boolean>;
  userName$: Observable<string|null>;
  currentUrl$: Observable<string>;

  constructor(
    private facebookLoginService: FacebookLoginService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.facebookLoginService.init();

    this.showApp$ = this.store.select(s => s.auth.jwt).pipe(
      map(t => !!t)
    );
    this.showSplash$ = this.store.select(s => s.auth.jwt).pipe(
      map(t => !t)
    );
    this.showFacebookLogin$ = this.store.select(s => s.auth.facebookToken).pipe(
      map(t => !t)
    );
    this.userName$ = this.store.select(s => s.auth.userName);
    this.currentUrl$ = this.store.select(s => s.router.state.url);
  }

  onTitleClick() {
    this.router.navigate(['']);
  }

  onTrainClick() {
    this.router.navigate(['train']);
  }

  onAnalyzeClick() {
    this.router.navigate(['analyze']);
  }

}
