import { createActionGroup, props } from '@ngrx/store';
import {
  AdditionalInfo,
  EmergencyContact,
  Form,
  LocationDetails,
  PersonalDetails,
  ProfessionalDetails,
  RegisterFormRequest, SpiritualDetails
} from '../../../../core/models/form.interface';

export const FormsActions = createActionGroup({
  source: 'Forms',
  events: {
    'Load Forms': props<{ userId?: string }>(),
    'Load Forms Success': props<{ forms: Form[] }>(),
    'Load Forms Failure': props<{ error: any }>(),

    'Load Form': props<{ formId: string }>(),
    'Load Form Success': props<{ form: Form }>(),
    'Load Form Failure': props<{ error: any }>(),

    'Register Form': props<{ data: RegisterFormRequest }>(),
    'Register Form Success': props<{ link: string }>(),
    'Register Form Failure': props<{ error: any }>(),

    'Submit Form': props<{ formId: string }>(),
    'Submit Form Success': props<{ form: Form }>(),
    'Submit Form Failure': props<{ error: any }>(),

    'Update Section Details': props<{
      formId: string;
      section: string;
      data: PersonalDetails | LocationDetails | ProfessionalDetails | SpiritualDetails | EmergencyContact | AdditionalInfo
    }>(),

    'Update Section Success': props<{ form: Form }>(),
    'Update Section Failure': props<{ error: any }>(),
  }
});
