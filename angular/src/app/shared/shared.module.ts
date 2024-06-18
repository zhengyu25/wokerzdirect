import { NgModule } from "@angular/core";

import { CustomAlertComponent } from "./custom-alert/custom-alert.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./interceptors/auth-interceptor";
import { AllMaterialModule } from "./all-material/all-material.module";
import { CommonModule } from "@angular/common";
import { IfEmptyPipe } from "./pipes/if-empty.pipe";

import { RouterModule } from "@angular/router";
import { QrCodeGeneratorComponent } from "./qr-code-generator/qr-code-generator.component";
import { CountdownTimerComponent } from "./countdown-timer/countdown-timer.component";
import { AnimatedDigitComponent } from "./animated-digit/animated-digit.component";
import { DialogInfoComponent } from "./dialog-info/dialog-info.component";
import { NoCommaPipe } from "./pipes/no-comma.pipe";
import { ToastrModule } from "ngx-toastr";

import { FormsModule } from "@angular/forms";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";

import { TabsModule } from "ngx-bootstrap/tabs";

import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { QuillModule } from "ngx-quill";
import { CustomQuillEditorComponent } from "./custom-quill-editor/custom-quill-editor.component";
import { BatchDataUploadComponent } from './batch-data-upload/batch-data-upload.component';

@NgModule({
  declarations: [
    CustomAlertComponent,
    QrCodeGeneratorComponent,
    IfEmptyPipe,
    CountdownTimerComponent,
    AnimatedDigitComponent,
    DialogInfoComponent,
    NoCommaPipe,
    CustomQuillEditorComponent,
    BatchDataUploadComponent,
  ],
  imports: [
    RouterModule,
    AllMaterialModule,
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      closeButton: true,
      enableHtml: true,
      tapToDismiss: false,
      // titleClass: "alert-title",
      positionClass: "toast-top-center",
      // toastClass: "ngx-toastr alert alert-dismissible alert-danger alert-notify",
      preventDuplicates: true,
    }),
    FormsModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    ProgressbarModule.forRoot(),
    QuillModule.forRoot({
      modules: {
        syntax: false,
        toolbar: [
          ["bold", "italic", "underline", "strike"], // toggled buttons
          ["blockquote"],
          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }], // superscript/subscript
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          [{ direction: "rtl" }], // text direction
          [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],
          ["clean"], // remove formatting button
          ["link", "image", "video"], // link and image, video
        ],
      },
    }),
  ],
  exports: [
    RouterModule,
    CustomAlertComponent,
    QrCodeGeneratorComponent,
    AllMaterialModule,
    IfEmptyPipe,
    CountdownTimerComponent,
    AnimatedDigitComponent,
    NoCommaPipe,
    ToastrModule,
    CollapseModule,
    BsDropdownModule,
    ModalModule,
    TabsModule,
    ProgressbarModule,
    BatchDataUploadComponent,
    QuillModule,
    CustomQuillEditorComponent,
  ],
  entryComponents: [DialogInfoComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
