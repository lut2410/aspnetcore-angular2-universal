import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthConfig, AuthHttp } from 'angular2-jwt/angular2-jwt';
import { AppComponent } from './app.component';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { environment } from '../environments';
import { CompaniesModule } from '../modules/companies';
import { CoreModule } from '../modules/core/core.module';
import { HomeModule } from '../modules/home';
import { JobsModule } from '../modules/jobs';
import { SessionStorageService } from '../modules/shared/services/session-storage.service';
import { AppRoutingModule } from './app-routing.module';

import { AuthenticationComponent } from './authentication/authentication.component';
import { EmployersComponent } from './employers/employers.component';
import { JobSeekersComponent } from './job-seekers/job-seekers.component';
import { LogOffComponent } from './log-off/log-off.component';
import { UrlSerializer } from '@angular/router';
import { CustomUrlSerializer } from '../modules/shared/services/customUrlSerializer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserTransferStateModule } from '../modules/transfer-state/browser-transfer-state.module';


export function authHttpServiceFactory(http: Http, options: RequestOptions, storage: SessionStorageService) {
  const authConfig = new AuthConfig({
    tokenName: environment.security.tokenName,
    tokenGetter: (() => storage.get(environment.security.tokenName)),
    noJwtError: true
  });
  return new AuthHttp(authConfig, http, options);
}
export function translateFactory(http: HttpClient, baseHref) {
  if (baseHref === null && typeof window !== 'undefined') {
    baseHref = window.location.origin;
  }
  return new TranslateHttpLoader(http, `${baseHref}/assets/i18n/`, '.json');
}
export function translateFactory_new(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    EmployersComponent,
    AuthenticationComponent,
    JobSeekersComponent,
    LogOffComponent
  ],
  imports: [
    BrowserAnimationsModule,    //actually in app.module.browser.ts (universal)
    BrowserTransferStateModule, //actually in app.module.browser.ts (universal)
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    CompaniesModule,
    JobsModule,
    ToastModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (translateFactory_new),
          deps: [HttpClient]
          // deps: [Http, [ORIGIN_URL]],
      }
  }),
  BrowserModule.withServerTransition({
      appId: 'my-app-id' // make sure this matches with your Browser NgModule
  }),
  ],
  providers: [
    {
        provide: AuthHttp,
        useFactory: authHttpServiceFactory,
        deps: [Http, RequestOptions, SessionStorageService],
    },
    { 
        provide: UrlSerializer,
        useClass: CustomUrlSerializer
    }
],
  bootstrap: [AppComponent]
})
export class AppModuleShared { }
