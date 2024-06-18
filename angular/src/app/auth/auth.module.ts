import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { AuthRoutes } from "./auth.routing";

import { LoginComponent } from "./login/login.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ProfileComponent } from "./profile/profile.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

@NgModule({
  declarations: [
    LoginComponent,
    ChangePasswordComponent,
    ProfileComponent,
    ResetPasswordComponent,
  ],
  exports: [ProfileComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(AuthRoutes)],
})
export class AuthModule {}
