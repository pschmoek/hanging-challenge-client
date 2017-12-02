import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-facebook-login-button',
  templateUrl: './facebook-login-button.component.html'
})
export class FacebookLoginButtonComponent implements OnInit {

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    FB.XFBML.parse(this.elementRef.nativeElement);
  }

}
