import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap, mergeMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { RouterNavigationAction } from '@ngrx/router-store';
import { Router } from '@angular/router';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';

import {
  SaveCurrentHangSessionSuccessAction,
  DiscardCurrentHangSessionAction,
  DISCARD_CURRENT_HANG_SESSION,
  SAVE_CURRENT_HANG_SESSION_SUCCESS
} from '../actions/hang';

@Injectable()
export class RouteToDashboardEffect {

  @Effect()
  routeToDashboard$: Observable<Action> =
    this.actions$.ofType<SaveCurrentHangSessionSuccessAction|DiscardCurrentHangSessionAction>(
      SAVE_CURRENT_HANG_SESSION_SUCCESS,
      DISCARD_CURRENT_HANG_SESSION
    ).pipe(
      tap(a => this.router.navigate([''])),
      mergeMap(a => EmptyObservable.create())
    );

  constructor(
    private actions$: Actions,
    private router: Router
  ) { }

}
