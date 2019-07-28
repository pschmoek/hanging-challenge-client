import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  SaveCurrentHangSessionSuccessAction,
  DiscardCurrentHangSessionAction,
  DISCARD_CURRENT_HANG_SESSION,
  SAVE_CURRENT_HANG_SESSION_SUCCESS
} from '../actions/hang';

@Injectable()
export class RouteToDashboardEffect {

  @Effect({ dispatch: false })
  routeToDashboard$: Observable<Action> =
    this.actions$.pipe(
      ofType<SaveCurrentHangSessionSuccessAction|DiscardCurrentHangSessionAction>(
        SAVE_CURRENT_HANG_SESSION_SUCCESS,
        DISCARD_CURRENT_HANG_SESSION
      ),
      tap(a => this.router.navigate(['']))
    );

  constructor(private actions$: Actions, private router: Router) { }

}
