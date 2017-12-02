import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-splash',
  template: `
<h2>Es wird nach einer bestehenden Session gesucht...</h2>

<app-facebook-login-button *ngIf="showFacebookLogin">
</app-facebook-login-button>
  `
})
export class SplashComponent {

  @Input() showFacebookLogin = false;

}