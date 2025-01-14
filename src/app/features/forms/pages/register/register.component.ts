import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiError } from '../../../../core/models/error.interface';
import {FormsActions} from '../../store/actions/forms.actions';
import {selectFormsError, selectFormsLoading, selectRegistrationLink} from '../../store/selectors/forms.selectors';

@Component({
  selector: 'app-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationForm: FormGroup;
  loading$: Observable<boolean>;
  error$: Observable<ApiError | null>;
  registrationLink$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.loading$ = this.store.select(selectFormsLoading);
    this.error$ = this.store.select(selectFormsError);
    this.registrationLink$ = this.store.select(selectRegistrationLink);
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.store.dispatch(FormsActions.registerForm({
        data: this.registrationForm.value
      }));
    }
  }
}
