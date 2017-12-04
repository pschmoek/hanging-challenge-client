import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { mergeMap, map } from 'rxjs/operators';
import { Effect } from '@ngrx/effects';

import { HangService } from '../services/hang/hang.service';
import { SAVE_CURRENT_HANG_SESSION, SaveCurrentHangSessionAction, SaveCurrentHangSessionSuccessAction } from '../actions/hang';

@Injectable()
export class SaveSessionEffect {

  @Effect()
  save$: Observable<Action> = this.actions$.ofType<SaveCurrentHangSessionAction>(SAVE_CURRENT_HANG_SESSION)
    .pipe(
      map(a => a.payload),
      mergeMap(session => this.hangService.addHangs(session.hangs)
        .pipe(
          map(savedHangs => new SaveCurrentHangSessionSuccessAction(savedHangs))
        )
      )
    );

  constructor(
    private actions$: Actions,
    private hangService: HangService
  ) { }

}
