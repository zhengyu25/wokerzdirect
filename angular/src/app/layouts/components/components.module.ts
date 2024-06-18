import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { PictureUploadComponent } from "./picture-upload/picture-upload.component";
import { SharedModule } from "app/shared/shared.module";

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    PictureUploadComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    PictureUploadComponent,
  ],
})
export class ComponentsModule {}
