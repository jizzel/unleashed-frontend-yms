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


@NgModule({
  declarations: [
    FormsComponent,
    FormStepperComponent,
    PersonalDetailsComponent,
    LocationBackgroundComponent,
    ProfessionalSkillsComponent,
    SpiritualJourneyComponent,
    EmergencyContactComponent,
    AdditionalInfoComponent
  ],
  imports: [
    CommonModule,
    FormsRoutingModule
  ]
})
export class FormsModule { }
