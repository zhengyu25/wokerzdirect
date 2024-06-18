import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { AuthGuard } from "./guard/auth/auth.guard";
import { ProfileComponent } from "./auth/profile/profile.component";

export const AppRoutes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "",
    canActivateChild: [AuthGuard],
    component: AdminLayoutComponent,
    children: [
      {
        path: "profile",
        component: ProfileComponent,
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./pages/dashboard/dashboard.module").then(
            (x) => x.DashboardModule
          ),
      },
      {
        path: "users",
        loadChildren: () =>
          import("./pages/user/user.module").then((x) => x.UserModule),
      },
    ],
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./auth/auth.module").then((x) => x.AuthModule),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "dashboard",
  },
];
