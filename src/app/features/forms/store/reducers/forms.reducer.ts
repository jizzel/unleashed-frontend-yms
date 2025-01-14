import { createFeature, createReducer, on } from '@ngrx/store';
import { FormsActions } from '../actions/forms.actions';
import { Form } from '../../../../core/models/form.interface';

export const formsFeatureKey = 'forms';

export interface State {
  forms: Form[];
  currentForm: Form | null;
  registrationLink: string | null;
  loading: boolean;
  error: any;
}

export const initialState: State = {
  forms: [],
  currentForm: null,
  registrationLink: null,
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(FormsActions.loadForms, state => state),
  on(FormsActions.loadFormsSuccess, (state, action) => state),
  on(FormsActions.loadFormsFailure, (state, action) => state),

  // Load Forms
  on(FormsActions.loadForms, (state): State => ({
    ...state,
    loading: true,
    error: null
  })),

  on(FormsActions.loadFormsSuccess, (state, { forms }) => ({
    ...state,
    forms,
    loading: false,
    error: null
  })),

  on(FormsActions.loadFormsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load Single Form
  on(FormsActions.loadForm, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(FormsActions.loadFormSuccess, (state, { form }) => ({
    ...state,
    currentForm: form,
    loading: false,
    error: null
  })),

  on(FormsActions.loadFormFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Register Form
  on(FormsActions.registerForm, (state) => ({
    ...state,
    loading: true,
    error: null,
    registeredLink: null
  })),

  on(FormsActions.registerFormSuccess, (state, payload) => ({
    ...state,
    registeredLink: payload,
    loading: false,
    error: null
  })),

  on(FormsActions.registerFormFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Submit Form
  on(FormsActions.submitForm, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(FormsActions.submitFormSuccess, (state, { form }) => ({
    ...state,
    currentForm: form,
    forms: state.forms.map(f => f.id === form.id ? form : f),
    loading: false,
    error: null
  })),

  on(FormsActions.submitFormFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update Section  (common for all section updates)
  on(FormsActions.updateSectionDetails, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(FormsActions.updateSectionSuccess, (state, { form }) => ({
    ...state,
    currentForm: form,
    forms: state.forms.map(f => f.id === form.id ? form : f),
    loading: false,
    error: null
  })),

  on(FormsActions.updateSectionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

export const formsFeature = createFeature({
  name: formsFeatureKey,
  reducer,
});

