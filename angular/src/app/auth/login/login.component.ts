import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService, DataService, HttpService } from "app/services/index";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  hidePwd: boolean = true;

  page = {
    en: {
      title: "WorkerzDIRECT",
      form: {
        username: {
          label: "Username",
          err: {
            required: "Username is required",
            email: "Please provide valid email",
          },
        },
        password: {
          label: "Password",
          err: {
            required: "Password is required",
          },
        },
      },
      btn: {
        login: "Login",
        forgotPassword: "Forgotten password?",
      },
      login: "Login Success",
    },
  };

  lang: any = this.page[this._dataService.language];
  lang$: Subscription = new Subscription();

  form: FormGroup;
  isSubmit: boolean = false;
  homePage = "dashboard";

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _httpService: HttpService,
    private _dataService: DataService,
    private _toastr: ToastrService
  ) {
    this.lang$ = this._dataService.language$.subscribe((lang) => {
      this.lang = this.page[lang];
    });

    if (this._authService.getToken()) {
      this._router.navigate([this.homePage]);
    }
  }

  ngOnInit() {
    this.initForm();

    const body = document.getElementsByTagName("body")[0];
    body.classList.add("login-page");
    const card = document.getElementsByClassName("card")[0];
    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      card.classList.remove("card-hidden");
    }, 700);
  }

  initForm() {
    this.form = this._fb.group({
      username: [null, [Validators.required]],
      password: ["", Validators.required],
    });
  }

  submit() {
    if (this.form.invalid || this.isSubmit) return;
    this.isSubmit = true;

    this._authService.login(this.form.value).subscribe(
      (res) => {
        this._authService.setToken(res.data.token);
        this._toastr.success(this.lang.login);
        this._router.navigate(["dashboard"]);
        this.isSubmit = false;
      },
      (err) => {
        this._httpService.handleError(err)
        this.isSubmit = false;
      }
    );
  }

  ngOnDestroy() {
    this.lang$.unsubscribe();

    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("login-page");
  }
}
