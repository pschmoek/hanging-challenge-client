import { Injectable } from '@angular/core';
import { FacebookLoginService } from './facebook-login.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '../store/store';

@Injectable()
export class BackendLoginService {

  constructor(
    private store: Store,
    private router: Router
  ) { }

  login() {

  }

  private resetJwtToken() {

  }

}
