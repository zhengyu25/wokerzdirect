import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { HttpService, DataService } from "app/services";
import { MustMatch } from "app/shared/validators/must-match.validator";
import { Subscription } from "rxjs";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-dialog-change-password",
  templateUrl: "./dialog-change-password.component.html",
  styleUrls: ["./dialog-change-password.component.scss"],
})
export class DialogChangePasswordComponent implements OnInit {
  form: FormGroup;
  hideCurrentPassword: boolean = true;
  hideNewPassword: boolean = true;
  hideConfirmPassword: boolean = true;
  isSubmit: boolean = false;

  page = {
    en: {
      title: "Change User Password",
      form: {
        password: {
          label: "New Password",
          err: {
            required: "New Password is required",
          },
        },
        c_password: {
          label: "Confirm Password",
          err: {
            required: "Confirm Password is required",
            mustMatch: "Confirm password not match with new password",
          },
        },
      },
      btn: {
        close: "Cancel",
        submit: "Change",
      },
      msg: {
        success: "User [name] password updated.",
      },
    },
    zh_CN: {
      title: "更改密码",
      form: {
        current_password: {
          label: "当前密码",
          err: {
            required: "请输入当前密码",
          },
        },
        password: {
          label: "新密码",
          err: {
            required: "请输入新密码",
          },
        },
        c_password: {
          label: "确认密码",
          err: {
            required: "请输入确认密码",
            mustMatch: "确认密码与新密码不符",
          },
        },
      },
      btn: {
        close: "Cancel",
        submit: "更换",
      },
      msg: {
        success: "User [name] password updated.",
      },
    },
  };

  lang: any = this.page[this._dataService.language];
  lang$: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<DialogChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _httpService: HttpService,
    private _dataService: DataService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.lang$ = this._dataService.language$.subscribe(
      (lang) => (this.lang = this.page[lang])
    );
    this.dialogRef.disableClose = true;

    this.initForm();
    console.log(this.data);
  }

  initForm() {
    this.form = this._fb.group(
      {
        id: [this.data.id, Validators.required],
        password: [null, Validators.required],
        c_password: [null, Validators.required],
      },
      {
        validator: MustMatch("password", "c_password"),
      }
    );
  }

  submit() {
    if (this.form.invalid || this.isSubmit) return;

    this.isSubmit = true;
    this._httpService
      .post("user/password/change", this.form.value)
      .subscribe(
        (res) => {
          this.isSubmit = false;
          this._toastr.success(
            this.lang.msg.success.replace("[name]", this.data.name)
          );
          this.dialogRef.close(res.data);
        },
        (err) => {
          this.isSubmit = false;
          this._httpService.handleError(err);
        }
      );
  }
}
