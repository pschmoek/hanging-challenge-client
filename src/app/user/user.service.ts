import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '../store/store';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  loadUser() {
    
  }

}
