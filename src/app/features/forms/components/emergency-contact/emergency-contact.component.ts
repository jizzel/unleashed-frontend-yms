import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {EmergencyContact} from '../../../../core/models/form.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {selectCanSubmitForm, selectFormsLoading} from '../../store/selectors/forms.selectors';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-emergency-contact',
  standalone: false,

  templateUrl: './emergency-contact.component.html',
  styleUrl: './emergency-contact.component.css'
})
export class EmergencyContactComponent {
  private store = inject(Store);
  @Input() set data(value: EmergencyContact | null | undefined) {
    if (value) {
      this.form.patchValue(value);
    }
  }

  @Output() save = new EventEmitter<EmergencyContact>();

  form: FormGroup;
  canSubmit$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      relationship: ['', Validators.required],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10,15}$')
      ]]
    });
    this.canSubmit$ = this.store.select(selectCanSubmitForm);
    this.isLoading$ = this.store.select(selectFormsLoading);
  }

  onSave() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }
}
