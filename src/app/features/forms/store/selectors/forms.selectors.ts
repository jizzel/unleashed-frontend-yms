import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromForms from '../reducers/forms.reducer';
import {Form, FormStatus} from '../../../../core/models/form.interface';
import {State} from '../reducers/forms.reducer';

export const selectFormsState = createFeatureSelector<fromForms.State>(
  fromForms.formsFeatureKey
);

export const selectAllForms = createSelector(
  selectFormsState,
  (state: State) => state.forms
);

export const selectCurrentForm = createSelector(
  selectFormsState,
  (state: State) => state.currentForm
);

export const selectRegistrationLink = createSelector(
  selectFormsState,
  (state: State) => state.registrationLink
);

export const selectFormsLoading = createSelector(
  selectFormsState,
  (state: State) => state.loading
);

export const selectFormsError = createSelector(
  selectFormsState,
  (state: State) => state.error
);

// Utility selectors
export const selectFormsByStatus = (status: FormStatus) => createSelector(
  selectAllForms,
  (forms: Form[]) => forms.filter(form => form.status === status)
);

export const selectFormById = (formId: string) => createSelector(
  selectAllForms,
  (forms: Form[]) => forms.find(form => form.id === formId)
);

export const selectFormCompletion = createSelector(
  selectCurrentForm,
  (form: Form | null) => {
    if (!form) return 0;

    const sections = [
      form.personalDetails,
      form.locationDetails,
      form.professionalDetails,
      form.spiritualDetails,
      form.emergencyContact,
      form.additionalInfo
    ];

    const completedSections = sections.filter(section => section !== null).length;
    return (completedSections / sections.length) * 100;
  }
);

export const selectCanSubmitForm = createSelector(
  selectCurrentForm,
  (form: Form | null) => {
    if (!form) return false;

    return (
      form.personalDetails !== null &&
      form.locationDetails !== null &&
      form.professionalDetails !== null &&
      form.spiritualDetails !== null &&
      form.emergencyContact !== null &&
      form.status !== 'SUBMITTED' &&
      form.status !== 'APPROVED'
    );
  }
);

export const selectFormStatus = createSelector(
  selectCurrentForm,
  (form: Form | null) => form?.status
);
