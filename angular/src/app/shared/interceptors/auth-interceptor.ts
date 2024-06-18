import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService, DataService } from 'app/services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private _authService;

  constructor(
    injector: Injector,
    private _router: Router,
    private _toastr: ToastrService,
    private _dataService: DataService
  ) {
    this._authService = injector.get(AuthService);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = this._authService.getToken();
    const authHeader = `Bearer ${token}`;
    const lang = this._dataService.language;
    const authReq = req.clone({
      setHeaders: {
        Authorization: authHeader,
        'X-localization': lang,
      },
    });
    return next.handle(authReq).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          return event;
        }
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status == 401) {
          this._authService.removeToken();
          this._toastr.error('Login Expired. Please login again');
          this._router.navigate(['login']);
          return throwError(false);
        }
        return throwError(new HttpErrorResponse(err));
      })
    );
  }
}
