import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-splash',
  template: `
<div class="jumbotron">
  <div class="container">
    <h1 class="display-3">Hanging Challenge</h1>
    <p class="lead">Please login.</p>
    <hr class="my-4">
    <app-facebook-login-button *ngIf="showFacebookLogin">
    </app-facebook-login-button>
  </div>
</div>
  `,
  styles: [`
  `]
})
export class SplashComponent {

  @Input() showFacebookLogin = false;

}
