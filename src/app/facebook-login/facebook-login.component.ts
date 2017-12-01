import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { FacebookLoginService } from './facebook-login.service';
import { Store } from '../store/store';

@Component({
  selector: 'app-facebook-login',
  templateUrl: './facebook-login.component.html'
})
export class FacebookLoginComponent implements OnInit {

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    FB.XFBML.parse(this.elementRef.nativeElement);
  }

}
