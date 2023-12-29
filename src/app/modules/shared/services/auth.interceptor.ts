import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, from, switchMap } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Preferences } from '@capacitor/preferences';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(Preferences.get({ key: 'access_token' })).pipe(
      switchMap((result) => {
        const userToken = result.value;
        const modifiedReq = req.clone({
          headers: req.headers.set('authorization', `Bearer ${userToken?.replaceAll(' ', '')}`),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
