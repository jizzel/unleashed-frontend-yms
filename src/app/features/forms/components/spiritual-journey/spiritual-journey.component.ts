import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { SpiritualDetails} from '../../../../core/models/form.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {selectCanSubmitForm, selectFormsLoading} from '../../store/selectors/forms.selectors';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-spiritual-journey',
  standalone: false,

  templateUrl: './spiritual-journey.component.html',
  styleUrl: './spiritual-journey.component.css'
})
export class SpiritualJourneyComponent {
  private store = inject(Store);
  @Input() set data(value: SpiritualDetails | null | undefined) {
    if (value) {
      this.form.patchValue(value);
    }
  }

  @Output() save = new EventEmitter<SpiritualDetails>();

  form: FormGroup;
  canSubmit$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      bornAgain: [null, Validators.required],
      baptized: [null, Validators.required],
      baptismType: [{ value: null, disabled: true }]
    });

    // Enable/disable baptism type based on baptized selection
    this.form.get('baptized')?.valueChanges.subscribe(value => {
      if (value) {
        this.form.get('baptismType')?.enable();
        this.form.get('baptismType')?.setValidators(Validators.required);
      } else {
        this.form.get('baptismType')?.disable();
        this.form.get('baptismType')?.clearValidators();
      }
      this.form.get('baptismType')?.updateValueAndValidity();
    });
    this.canSubmit$ = this.store.select(selectCanSubmitForm);
    this.isLoading$ = this.store.select(selectFormsLoading);
  }

  onSave() {
    if (this.form.valid) {
      const formValue = this.form.value;
      // Only include baptismType if baptized is true
      const spiritualDetails: SpiritualDetails = {
        bornAgain: formValue.bornAgain,
        baptized: formValue.baptized,
        ...(formValue.baptized && { baptismType: formValue.baptismType })
      };
      this.save.emit(spiritualDetails);
    }
  }
}
