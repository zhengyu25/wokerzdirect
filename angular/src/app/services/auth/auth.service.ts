import { Injectable } from "@angular/core";
import { Observable, Subject, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { HttpService } from "../http/http.service";
import { DataService } from "../data/data.service";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  endPoint = {
    login: "login",
    getProfile: "user/profile",
  };

  page = {
    en: {
      logout: {
        btn: {
          confirm: "Logout",
          cancel: "Cancel",
        },
        msg: {
          confirmation: "Are you sure to logout ?",
          success: "Logout Success",
        },
      },
      tac: {
        email: "TAC has been sent to your email [username]",
        sms: "TAC has been sent to your mobile number end with [username]",
        error: "Tac Invalid Request",
      },
    },
    zh: {
      logout: {
        btn: {
          confirm: "确认",
          cancel: "取消",
        },
        msg: {
          confirmation: "确定登出 ？",
          success: "登出成功",
        },
      },
      tac: {
        email: "验证码已发送到 [username]",
        sms: "验证码已发送到 [username]",
        error: "验证码提取失败",
      },
    },
  };

  // Get Local Storage Language
  lang: any = this.page[this._dataService.language];
  token$ = new Subject<boolean>();

  constructor(
    private _router: Router,
    private _httpService: HttpService,
    private _dataService: DataService,
    private _toastr: ToastrService
  ) {}

  login(credential: { username: string; password: string }): Observable<any> {
    return this._httpService.post(this.endPoint.login, credential);
  }

  logout() {
    let selectedMsg = this.lang.logout;

    return Swal.fire({
      title: selectedMsg.msg.confirmation,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: selectedMsg.btn.confirm,
      cancelButtonText: selectedMsg.btn.cancel,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // localStorage.clear();
        this._toastr.success(selectedMsg.msg.success);

        localStorage.removeItem("token");

        this._router.navigate(["login"]);

        const body = document.getElementsByTagName("body")[0];
        body.classList.remove("app-layout");
      }
    });
  }

  getProfile(): Observable<any> {
    return this._httpService.get(this.endPoint.getProfile);
  }

  getToken(): string | boolean {
    return localStorage.getItem("token") || false;
  }

  setToken(token) {
    localStorage.setItem("token", token);
    this.token$.next(true);
  }

  removeToken(): void {
    localStorage.removeItem("token");
    this.token$.next(false);
  }
}
