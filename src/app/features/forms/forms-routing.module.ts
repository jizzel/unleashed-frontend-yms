import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormStepperComponent} from './pages/form-stepper/form-stepper.component';
import {RegisterComponent} from './pages/register/register.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'register', component: RegisterComponent },
  { path: ':formId', component: FormStepperComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
