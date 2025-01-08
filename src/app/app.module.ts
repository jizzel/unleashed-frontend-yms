import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './reducers';
import {environment} from '../environments/environment';
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({name: 'unleashed', maxAge: 25, logOnly: environment.production}),
        environment.production ? StoreDevtoolsModule.instrument() : [],
        SharedModule,
      CoreModule
    ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
