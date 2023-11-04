import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginStart, loginSuccess, setErrorMessage } from './auth.actions';
import { catchError, exhaustMap, finalize, map, of, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.actions$.subscribe((action) => {
      console.log('Action Dispatched:', action);
    });
    // this.login$.subscribe((effect) => {
    //   console.log('Effect Triggered:', effect);
    // });
  }
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            const user = this.authService.formatUser(data);
            this.store.dispatch(setErrorMessage({ message: '' }));
            return loginSuccess({ user });
          }),
          finalize(() => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
          }),
          catchError((errResp) => {
            const errorMessage = this.authService.getErrorMessage(
              errResp.error.error.message
            );
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  $loginRedirect = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap((action) => this.router.navigate(['/']))
      );
    },
    { dispatch: false } // if we don't need to dispatch any action
  );
}
