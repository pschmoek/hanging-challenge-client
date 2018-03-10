import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-splash',
  template: `
<div class="splash">
  <div class="container">
    <h1 class="display-3">Hanging Challenge</h1>
    <p class="lead">{{ message }}</p>
    <hr class="my-4">
    <app-facebook-login-button *ngIf="showFacebookLogin">
    </app-facebook-login-button>
  </div>
</div>
  `,
  styleUrls: ['./splash.component.less']
})
export class SplashComponent {

  @Input() showFacebookLogin = false;
  @Input() message: string|undefined;

}
