import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService  {

  constructor() { }


   handleErrorAuth(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
      return throwError(() => 'Usuário ou Senha inválidos.');
  } else if (error.status === 0) {
    return throwError(() =>'Erro ao consumir o serviço. Tente novamente mais tarde.');
  } else if (error.status === 500) {
    return throwError(() =>'Erro ao consumir o serviço. Tente novamente mais tarde.');
  } else {
      return throwError(() =>'Erro de Funcionamento, tente novamente mais tarde.');
    }
  }

}
