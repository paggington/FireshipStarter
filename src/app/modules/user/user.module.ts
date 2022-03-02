import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {SharedModule} from "../shared/shared.module";
import {GoogleSignInDirective} from "../../directives/user/google-signin.directive";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginPageComponent} from "../../components/user/login-page/login-page.component";
import {AppModule} from "../../app.module";
import {EmailLoginComponent} from "../../components/user/email-login/email-login.component";
import {HomepageComponent} from "../../components/homepage/homepage.component";


@NgModule({
  declarations: [GoogleSignInDirective,LoginPageComponent,EmailLoginComponent,
    HomepageComponent],
  exports:[GoogleSignInDirective],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
