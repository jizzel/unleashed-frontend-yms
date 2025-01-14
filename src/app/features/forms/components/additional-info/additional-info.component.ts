import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {AdditionalInfo} from '../../../../core/models/form.interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {selectCanSubmitForm, selectFormsLoading} from '../../store/selectors/forms.selectors';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-additional-info',
  standalone: false,

  templateUrl: './additional-info.component.html',
  styleUrl: './additional-info.component.css'
})
export class AdditionalInfoComponent {
  private store = inject(Store);
  @Input() set data(value: AdditionalInfo | null | undefined) {
    if (value) {
      this.form.patchValue(value);
    }
  }

  @Output() save = new EventEmitter<AdditionalInfo>();

  form: FormGroup;
  canSubmit$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      comments: ['']
    });
    this.canSubmit$ = this.store.select(selectCanSubmitForm);
    this.isLoading$ = this.store.select(selectFormsLoading);
  }

  onSave() {
    this.save.emit(this.form.value);
  }
}
