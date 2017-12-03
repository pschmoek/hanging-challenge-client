import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { mergeMap, map } from 'rxjs/operators';
import { Effect } from '@ngrx/effects';

import { HangService } from '../services/hang/hang.service';
import { HangCompleteAction, HANG_COMPLETE, SaveHangSuccessAction } from '../actions/hang';

@Injectable()
export class SaveNewHangEffect {

  @Effect()
  save$: Observable<Action> = this.actions$.ofType<HangCompleteAction>(HANG_COMPLETE)
    .pipe(
      map(a => a.payload),
      mergeMap(hang => this.hangService.addHang(hang)
        .pipe(
          map(savedHang => new SaveHangSuccessAction(savedHang))
        )
      )
    );

  constructor(
    private actions$: Actions,
    private hangService: HangService
  ) { }

}
