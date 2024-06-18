import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { HttpService, DataService } from "app/services";
import { MustMatch } from "app/shared/validators/must-match.validator";
import { Subscription } from "rxjs";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-dialog-new-user",
  templateUrl: "./dialog-new-user.component.html",
  styleUrls: ["./dialog-new-user.component.scss"],
})
export class DialogNewUserComponent implements OnInit {
  form: FormGroup;
  hideCurrentPassword: boolean = true;
  hideNewPassword: boolean = true;
  hideConfirmPassword: boolean = true;
  isSubmit: boolean = false;

  page = {
    en: {
      title: "Create New User",
      form: {
        email: {
          label: "Email",
          err: {
            required: "Email is required",
            email: "Please provide valid email",
          },
        },
        name: {
          label: "Name",
          err: {
            required: "Name is required",
          },
        },
        password: {
          label: "Password",
          err: {
            required: "Password is required",
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
        submit: "Create New",
      },
      msg: {
        success: "New user [name] created.",
      },
    },
    zh_CN: {
      title: "Create New User",
      form: {
        email: {
          label: "Email",
          err: {
            required: "Email is required",
            email: "Please provide valid email",
          },
        },
        name: {
          label: "Name",
          err: {
            required: "Name is required",
          },
        },
        password: {
          label: "Password",
          err: {
            required: "Password is required",
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
        submit: "Create New",
      },
      msg: {
        success: "New user [name] created.",
      },
    },
  };

  lang: any = this.page[this._dataService.language];
  lang$: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<DialogNewUserComponent>,
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
  }

  initForm() {
    this.form = this._fb.group(
      {
        email: [null, [Validators.required, Validators.email]],
        name: [null, Validators.required],
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
    this._httpService.post("user", this.form.value).subscribe(
      ({ data }) => {
        this.isSubmit = false;
        this._toastr.success(
          this.lang.msg.success.replace("[name]", data.name)
        );
        this.dialogRef.close(data);
      },
      (err) => {
        this.isSubmit = false;
        this._httpService.handleError(err);
      }
    );
  }
}
