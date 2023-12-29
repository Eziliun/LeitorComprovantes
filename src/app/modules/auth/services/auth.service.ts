import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, take, timeout } from 'rxjs';
import { iDefaultResponse } from '../../shared/interfaces/default.interface';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private loginErrorHandler: ErrorHandlerService,
  ) { }

  login(requestLogin: any): Observable<iDefaultResponse> {
    return this.http.post<iDefaultResponse>(
      `${environment.API}/login`,
      requestLogin,
    )
    .pipe(
      take(3),
      timeout(3000),
      catchError((err) => this.loginErrorHandler.handleErrorAuth(err))
    );
  }

  async logout() {
    try {
      await Preferences.clear();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }
  
  async isAuthenticated() {
      const result = await Preferences.get({ key: 'access_token' });
      return !!result.value;
  }
}
