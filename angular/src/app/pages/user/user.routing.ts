import { Routes } from "@angular/router";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { UserListComponent } from "./user-list/user-list.component";

export const UserRoutes: Routes = [
  {
    path: "",
    component: UserListComponent,
  },
  {
    path: ":id",
    component: UserDetailComponent,
  },
];
