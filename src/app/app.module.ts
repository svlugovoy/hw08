import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RoutingModule} from './routing.module';
import {HttpClientModule} from '@angular/common/http';
import {TodoService} from './services/todo.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataExchangeService} from './services/data-exchange.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {NgxSpinnerModule} from 'ngx-spinner';
import {AuthService} from './services/auth.service';

import {HomeModule} from './modules/home-module/home.module';
import {NavModule} from './modules/nav-module/nav.module';
import {AuthModule} from './modules/auth-module/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HomeModule,
    NavModule,
    AuthModule
  ],
  providers: [TodoService, DataExchangeService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
