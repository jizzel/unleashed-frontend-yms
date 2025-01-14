import {inject, Injectable} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import { of } from 'rxjs';
import { FormsActions } from '../actions/forms.actions';
import {FormService} from "../../../../core/services/form.service";
import {Router} from "@angular/router";


@Injectable()
export class FormsEffects {
  private actions$ = inject(Actions);

  loadForms$ = createEffect(() =>
      this.actions$.pipe(
          ofType(FormsActions.loadForms),
          mergeMap(() =>
              this.formService.getAllForms().pipe(
                  map(forms => FormsActions.loadFormsSuccess({ forms })),
                  catchError(error => of(FormsActions.loadFormsFailure({ error })))
              )
          )
      )
  );

  loadForm$ = createEffect(() =>
      this.actions$.pipe(
          ofType(FormsActions.loadForm),
          mergeMap(({ formId }) =>
              this.formService.getFormById(formId).pipe(
                  map(form => FormsActions.loadFormSuccess({ form })),
                  catchError(error => of(FormsActions.loadFormFailure({ error })))
              )
          )
      )
  );

  registerForm$ = createEffect(() =>
      this.actions$.pipe(
          ofType(FormsActions.registerForm),
          mergeMap(({ data }) =>
              this.formService.registerForm(data).pipe(
                  map(response => FormsActions.registerFormSuccess({ link: response.link })),
                  catchError(error => of(FormsActions.registerFormFailure({ error })))
              )
          )
      )
  );

  submitForm$ = createEffect(() =>
      this.actions$.pipe(
          ofType(FormsActions.submitForm),
          mergeMap(({ formId }) =>
              this.formService.submitForm(formId).pipe(
                  map(form => FormsActions.submitFormSuccess({ form })),
                  catchError(error => of(FormsActions.submitFormFailure({ error })))
              )
          )
      )
  );

  updateSectionDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FormsActions.updateSectionDetails),
      mergeMap(({ formId, section, data }) =>
        this.formService.updateSectionDetails(formId, section, data).pipe(
          map(form => FormsActions.updateSectionSuccess({ form })),
          catchError(error => of(FormsActions.updateSectionFailure({ error })))
        )
      )
    )
  );

  registerSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FormsActions.registerFormSuccess),
            tap(({ link }) => this.router.navigate([`/forms/${link.split('/').pop()}`])
            )
        ),
        { dispatch: false });


  constructor(
      private formService: FormService,
      private router: Router
  ) {}
}
