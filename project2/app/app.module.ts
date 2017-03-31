import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { APP_ROUTER_PROVIDERS } from "./app.routes";
import {LocationStrategy, PathLocationStrategy} from '@angular/common';

import { APP_BASE_HREF } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HTTP_PROVIDERS, BrowserXhr} from '@angular/http';
import { CustomBrowserXhr } from './basket/basket.service'



@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
  APP_ROUTER_PROVIDERS,
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    },
  HTTP_PROVIDERS,
    {
      provide: BrowserXhr,
      useClass: CustomBrowserXhr

    },
    {
      provide: LocationStrategy, useClass: PathLocationStrategy
    }
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
