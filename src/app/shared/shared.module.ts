import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    ErrorMessageComponent
  ],
    imports: [
        CommonModule,
        RouterLink
    ]
})
export class SharedModule { }
