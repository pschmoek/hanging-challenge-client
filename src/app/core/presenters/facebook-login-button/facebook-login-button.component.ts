import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Store } from '../../../store/store';

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
