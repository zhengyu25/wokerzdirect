import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { HttpService, DataService } from "app/services";
import { MustMatch } from "app/shared/validators/must-match.validator";
import { Subscription } from "rxjs";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-dialog-update-user",
  templateUrl: "./dialog-update-user.component.html",
  styleUrls: ["./dialog-update-user.component.scss"],
})
export class DialogUpdateUserComponent implements OnInit {
  form: FormGroup;
  hideCurrentPassword: boolean = true;
  hideNewPassword: boolean = true;
  hideConfirmPassword: boolean = true;
  isSubmit: boolean = false;

  page = {
    en: {
      title: "Update User",
      form: {
        name: {
          label: "Name",
          err: {
            required: "Name is required",
          },
        },

        email: {
          label: "Email",
          err: {
            required: "Email is required",
            email: "Please provide valid email",
          },
        },
      },
      btn: {
        close: "Cancel",
        submit: "Update",
      },
      msg: {
        success: "User [name] updated.",
      },
    },
    zh_CN: {
      title: "Update User",
      form: {
        name: {
          label: "Name",
          err: {
            required: "Name is required",
          },
        },

        email: {
          label: "Email",
          err: {
            required: "Email is required",
            email: "Please provide valid email",
          },
        },
      },
      btn: {
        close: "Cancel",
        submit: "Update",
      },
      msg: {
        success: "User [name] updated.",
      },
    },
  };

  lang: any = this.page[this._dataService.language];
  lang$: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateUserComponent>,
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
  }

  initForm() {
    this.form = this._fb.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      email: [null],
    });

    this.form.patchValue(this.data);
  }

  submit() {
    if (this.form.invalid || this.isSubmit) return;

    this.isSubmit = true;
    this._httpService.post("user/update", this.form.value).subscribe(
      ({ data }) => {
        console.log(data);
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
