import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {PersonalDetails} from '../../../../core/models/form.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {selectCanSubmitForm, selectFormsLoading} from '../../store/selectors/forms.selectors';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-personal-details',
  standalone: false,

  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.css'
})
export class PersonalDetailsComponent {
  private store = inject(Store);
  @Input() set data(value: PersonalDetails | null | undefined) {
    if (value) {
      this.form.patchValue(value);
    }
  }

  @Output() save = new EventEmitter<PersonalDetails>();

  form: FormGroup;
  isLoading$: Observable<boolean>;
  canSubmit$: Observable<boolean>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required]
    });
    this.isLoading$ = this.store.select(selectFormsLoading);
    this.canSubmit$ = this.store.select(selectCanSubmitForm);
  }

  ngOnInit() {
    // Listen for form changes to enable/disable save button
    this.form.statusChanges.subscribe(status => {
      console.log('Form status:', status);
    });
  }

  onSave() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }

}
