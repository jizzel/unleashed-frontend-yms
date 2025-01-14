import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './forms.component';
import { FormStepperComponent } from './pages/form-stepper/form-stepper.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { LocationBackgroundComponent } from './components/location-background/location-background.component';
import { ProfessionalSkillsComponent } from './components/professional-skills/professional-skills.component';
import { SpiritualJourneyComponent } from './components/spiritual-journey/spiritual-journey.component';
import { EmergencyContactComponent } from './components/emergency-contact/emergency-contact.component';
import { AdditionalInfoComponent } from './components/additional-info/additional-info.component';
import { StoreModule } from '@ngrx/store';
import * as fromForms from './store/reducers/forms.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FormsEffects } from './store/effects/forms.effects';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import {SharedModule} from '../../shared/shared.module';
import { ReviewComponent } from './components/review/review.component';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatCard, MatCardContent} from "@angular/material/card";


@NgModule({
  declarations: [
    FormsComponent,
    FormStepperComponent,
    PersonalDetailsComponent,
    LocationBackgroundComponent,
    ProfessionalSkillsComponent,
    SpiritualJourneyComponent,
    EmergencyContactComponent,
    AdditionalInfoComponent,
    RegisterComponent,
    ReviewComponent
  ],
    imports: [
        CommonModule,
        FormsRoutingModule,
        StoreModule.forFeature(fromForms.formsFeatureKey, fromForms.reducer),
        EffectsModule.forFeature([FormsEffects]),
        MatStepperModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatRadioModule,
        MatChipsModule,
        MatIconModule,
        MatProgressBarModule,
        ReactiveFormsModule,
        SharedModule,
        MatProgressSpinner,
        MatCard,
        MatCardContent
    ]
})
export class FormsModule { }
