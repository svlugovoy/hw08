import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoutingModule} from '../../routing.module';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  providers: [],
  exports: [
    LoginComponent,
    RegistrationComponent
  ]
})
export class AuthModule {
}
