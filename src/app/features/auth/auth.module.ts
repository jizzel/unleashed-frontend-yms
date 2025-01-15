import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from './store/reducers/auth.reducer';
import { AuthEffects } from './store/effects/auth.effects';
import {ReactiveFormsModule} from "@angular/forms";
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    LoginComponent
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
        EffectsModule.forFeature([AuthEffects]),
        ReactiveFormsModule,
        MatCard,
        MatCardContent,
        MatFormField,
        MatInput,
        MatIconButton,
        MatIcon,
        MatCardActions,
        MatButton,
        MatProgressSpinner,
        MatLabel,
        MatError,
    ]
})
export class AuthModule { }
