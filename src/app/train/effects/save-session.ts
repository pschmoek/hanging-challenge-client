import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { mergeMap, map, withLatestFrom } from 'rxjs/operators';
import { Effect } from '@ngrx/effects';

import { SAVE_CURRENT_HANG_SESSION, SaveCurrentHangSessionAction, SaveCurrentHangSessionSuccessAction } from '../actions/hang';
import { AppState } from '../reducers/index';
import { HangService } from '../../core/services/hang/hang.service';
import { HangSessionService } from '../services/hang-session.service';
import { HangSession } from '../services/hang-session';

@Injectable()
export class SaveSessionEffect {

  @Effect()
  save$: Observable<Action> = this.actions$.ofType<SaveCurrentHangSessionAction>(SAVE_CURRENT_HANG_SESSION)
    .pipe(
      withLatestFrom(this.store.select(s => s.train.hang)),
      map(([action, hangState]) => {
        const hangSession: HangSession = {
          date: new Date().toISOString().split('T')[0],
          hangs: hangState.currentSession.hangs,
          restTime: hangState.settings.pauseTime,
          targetTime: hangState.settings.maxPerRepetition
        };

        return hangSession;
      }),
      mergeMap(hangSession => this.hangSessionService.save(hangSession)
        .pipe(
          map(savedHangs => new SaveCurrentHangSessionSuccessAction(savedHangs))
        )
      )
    );

  constructor(
    private actions$: Actions,
    private hangSessionService: HangSessionService,
    private store: Store<AppState>
  ) { }

}
