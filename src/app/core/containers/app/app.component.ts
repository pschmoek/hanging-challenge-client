import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { FacebookLoginService } from '../../services/facebook/facebook-login.service';
import { AppState } from '../../../root-reducer';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  showApp$ = this.store.select(s => s.auth.jwt).pipe(
    map(t => !!t)
  );
  showSplash$ = this.store.select(s => s.auth.jwt).pipe(
    map(t => !t)
  );
  showFacebookLogin$ = this.store.select(s => s.auth.facebookToken).pipe(
    map(t => !t)
  );
  userName$ = this.store.select(s => s.auth.userName);
  currentUrl$ = this.store.select(s => s.router.state.url);
  splashMessage$ = this.store.select(s => s.auth.facebookToken).pipe(
    map(token => token ? 'Facebook login successful. Please wait...' : 'Please login.')
  );

  constructor(
    private facebookLoginService: FacebookLoginService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.facebookLoginService.init();
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
