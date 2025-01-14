import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {PersonalDetails, ProfessionalDetails} from '../../../../core/models/form.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {selectCanSubmitForm, selectFormsLoading} from '../../store/selectors/forms.selectors';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-professional-skills',
  standalone: false,

  templateUrl: './professional-skills.component.html',
  styleUrl: './professional-skills.component.css'
})
export class ProfessionalSkillsComponent {
  private store = inject(Store);
  @Input() set data(value: ProfessionalDetails | null | undefined) {
    if (value) {
      this.form.patchValue({ occupation: value.occupation });
      this.skills = [...value.skills];
    }
  }

  @Output() save = new EventEmitter<ProfessionalDetails>();

  form: FormGroup;
  skills: string[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  canSubmit$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      occupation: ['', Validators.required]
    });
    this.canSubmit$ = this.store.select(selectCanSubmitForm);
    this.isLoading$ = this.store.select(selectFormsLoading);
  }

  get isValid(): boolean {
    return this.form.valid && this.skills.length > 0;
  }

  addSkill(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.skills.push(value);
      event.chipInput!.clear();
    }
  }

  removeSkill(skill: string): void {
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  onSave() {
    if (this.isValid) {
      this.save.emit({
        occupation: this.form.value.occupation,
        skills: this.skills
      });
    }
  }

}
