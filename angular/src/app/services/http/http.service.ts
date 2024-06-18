import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";
import { environment } from "env/environment";
import { ToastrService } from "ngx-toastr";
import moment from "moment";
import * as _ from "lodash";
import { DataService, LoggerService } from "app/services/index";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  page = {
    en: {
      error: {
        default: "Error Occured. Please refresh the page.",
        serverBusy: "Server is busy, please try again later.",
      },
    },
    zh: {
      error: {
        default: "发生了错误。请刷新页面。",
        serverBusy: "服务器繁忙，请稍后再试。",
      },
    },
  };

  // Get Local Storage Language
  lang: any = this.page[this._dataService.language];
  lang$: Subscription = new Subscription();

  constructor(
    private _dataService: DataService,
    private _http: HttpClient,
    private _toastr: ToastrService
  ) {
    this.lang$ = this._dataService.language$.subscribe((lang) => {
      this.lang = this.page[lang];
    });
  }

  get(path: string): Observable<any> {
  //   let splitPath = path.split("?");
  //   let dt = moment.now();

  //   let newPath = null;
  //   if (splitPath.length > 0) {
  //     for (let index = 0; index < splitPath.length; index++) {
  //       if (index == 0) {
  //         newPath = `${splitPath[0]}?dthaha=${dt}`;
  //       } else {
  //         newPath += `&${splitPath[index]}`;
  //       }
  //     }
  //   }
    // return this._http.get(`${environment.serverUrl}/api/${newPath}`);
    return this._http.get(`${environment.serverUrl}/api/${path}`);
  }

  post(path: string, data: any): Observable<any> {
    return this._http.post(`${environment.serverUrl}/api/${path}`, data);
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this._http.get(imageUrl, { responseType: "blob" });
  }

  handleError(err: any, defaultMsg: string = this.lang.error.default) {
    let msg = this.lang.error.serverBusy;

    if ([400, 401, 404].includes(err.status)) {
      if (err instanceof HttpErrorResponse) {
        // msg = err.error!.data!.errorMsg;
        if (_.has(err, "error.data.errorMsg")) {
          msg = _.get(err, "error.data.errorMsg");
        } else if (_.has(err, "error.message")) {
          msg = _.get(err, "error.message");
        } else {
          msg = _.get(err, "error");
        }
      } else {
        msg = defaultMsg || err;
      }

      if (msg.includes("SQLSTATE")) {
        msg = this.lang.error.serverBusy;
      }
    }

    this._toastr.error(msg || defaultMsg);
    LoggerService.error(err);
  }
}
