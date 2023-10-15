import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
import {LocalStorageService} from "../services/local-storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private localStorageService:LocalStorageService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if ((request.url!==environment.authUrl)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.localStorageService.getItem('token')}`
        }
      });
    }
    return next.handle(request);
  }
}
