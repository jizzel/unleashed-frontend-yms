import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {LocationDetails} from '../../../../core/models/form.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {selectCanSubmitForm, selectFormsLoading} from '../../store/selectors/forms.selectors';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-location-background',
  standalone: false,

  templateUrl: './location-background.component.html',
  styleUrl: './location-background.component.css'
})
export class LocationBackgroundComponent {
  private store = inject(Store);
  @Input() set data(value: LocationDetails | null | undefined) {
    if (value) {
      this.form.patchValue({ address: value.address });
      this.languages = [...value.languagesSpoken || []];
    }
  }

  @Output() save = new EventEmitter<LocationDetails>();

  form: FormGroup;
  languages: string[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  canSubmit$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      address: ['', Validators.required]
    });
    this.canSubmit$ = this.store.select(selectCanSubmitForm);
    this.isLoading$ = this.store.select(selectFormsLoading);

  }

  get isValid(): boolean {
    return this.form.valid && this.languages.length > 0;
  }

  addLanguage(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.languages.push(value);
      event.chipInput!.clear();
    }
  }

  removeLanguage(language: string): void {
    const index = this.languages.indexOf(language);
    if (index >= 0) {
      this.languages.splice(index, 1);
    }
  }

  onSave() {
    if (this.isValid) {
      this.save.emit({
        languagesSpoken: this.languages,
        address: this.form.value.address
      });
    }
  }
}
