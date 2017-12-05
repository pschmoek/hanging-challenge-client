import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { mergeMap, map, withLatestFrom } from 'rxjs/operators';
import { Effect } from '@ngrx/effects';

import { SAVE_CURRENT_HANG_SESSION, SaveCurrentHangSessionAction, SaveCurrentHangSessionSuccessAction } from '../actions/hang';
import { TrainState } from '../reducers/index';
import { HangService } from '../../core/services/hang/hang.service';

@Injectable()
export class SaveSessionEffect {

  @Effect()
  save$: Observable<Action> = this.actions$.ofType<SaveCurrentHangSessionAction>(SAVE_CURRENT_HANG_SESSION)
    .pipe(
      withLatestFrom(this.store.select(s => s.train.hang.currentSession.hangs)),
      map(v => v[1]),
      mergeMap(hangs => this.hangService.addHangs(hangs)
        .pipe(
          map(savedHangs => new SaveCurrentHangSessionSuccessAction(savedHangs))
        )
      )
    );

  constructor(
    private actions$: Actions,
    private hangService: HangService,
    private store: Store<TrainState>
  ) { }

}
