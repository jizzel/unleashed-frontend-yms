import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {loaderInterceptor} from './interceptors/loader.interceptor';
import {errorInterceptor} from './interceptors/error.interceptor';
import {authInterceptor} from './interceptors/auth.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    provideHttpClient(
      withInterceptors([
        loaderInterceptor,
        errorInterceptor,
        authInterceptor,
      ])
    )
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only.'
      );
    }
  }
}
