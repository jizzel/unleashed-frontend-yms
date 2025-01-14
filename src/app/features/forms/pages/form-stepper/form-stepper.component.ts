import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {filter, Observable, take} from 'rxjs';
import {Form, FormSectionType} from '../../../../core/models/form.interface';
import {ActivatedRoute} from '@angular/router';
import {
  selectCanSubmitForm,
  selectCurrentForm,
  selectFormCompletion,
  selectFormsLoading
} from '../../store/selectors/forms.selectors';
import {FormsActions} from '../../store/actions/forms.actions';
import {MatStepper} from '@angular/material/stepper';

@Component({
  selector: 'app-form-stepper',
  standalone: false,

  templateUrl: './form-stepper.component.html',
  styleUrl: './form-stepper.component.css'
})
export class FormStepperComponent implements OnInit {
  private store = inject(Store);
  currentForm$: Observable<Form | null>;
  formCompletion$: Observable<number>;
  canSubmit$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  isSmallScreen$: Observable<boolean>;
  formId: string | null = null;
  @ViewChild('stepper') stepper!: MatStepper;

  constructor(
    private route: ActivatedRoute
  ) {
    this.currentForm$ = this.store.select(selectCurrentForm);
    this.formCompletion$ = this.store.select(selectFormCompletion);
    this.canSubmit$ = this.store.select(selectCanSubmitForm);
    this.isLoading$ = this.store.select(selectFormsLoading);

    // Use BreakpointObserver for responsive stepper orientation
    this.isSmallScreen$ = new Observable<boolean>(subscriber => {
      const mediaQuery = window.matchMedia('(max-width: 768px)');
      subscriber.next(mediaQuery.matches);

      const listener = (e: MediaQueryListEvent) => subscriber.next(e.matches);
      mediaQuery.addEventListener('change', listener);

      return () => mediaQuery.removeEventListener('change', listener);
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.formId = params.get('formId');
      if (this.formId) {
        this.store.dispatch(FormsActions.loadForm({formId: this.formId}));
      }
    });
  }

  isStepComplete(section: keyof Form): boolean {
    let isComplete = false;
    this.currentForm$.subscribe(form => {
      if (form && form[section] !== null) {
        isComplete = true;
      }
    }).unsubscribe();
    return isComplete;
  }

  onSaveSectionDetails(data: any, section: FormSectionType) {
    if (this.formId) {
      this.store.dispatch(FormsActions.updateSectionDetails({
        formId: this.formId,
        section,
        data
      }));

      // Check the current loading state immediately
      this.isLoading$.pipe(take(1)).subscribe(isLoading => {
        if (!isLoading && this.isStepComplete(section)) {
          this.stepper.next(); // Move to the next step if already not loading
        } else {
          // Wait for loading to complete
          this.isLoading$.pipe(
            filter(isLoading => !isLoading),
            take(1)
          ).subscribe(() => {
            this.stepper.next();
          });
        }
      });
    }
  }

  onSubmit() {
    if (this.formId) {
      this.store.dispatch(FormsActions.submitForm({formId: this.formId}));
    }
  }

  protected readonly FormSectionType = FormSectionType;
}
