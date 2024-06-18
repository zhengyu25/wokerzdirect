import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { UserListComponent } from "./user-list/user-list.component";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { UserRoutes } from "./user.routing";
import { SharedModule } from "app/shared/shared.module";
import { DialogChangePasswordComponent } from './dialog-change-password/dialog-change-password.component';
import { DialogNewUserComponent } from './dialog-new-user/dialog-new-user.component';
import { DialogUpdateUserComponent } from './dialog-update-user/dialog-update-user.component';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(UserRoutes)],
  declarations: [UserListComponent, UserDetailComponent, DialogChangePasswordComponent, DialogNewUserComponent, DialogUpdateUserComponent],
})
export class UserModule {}
