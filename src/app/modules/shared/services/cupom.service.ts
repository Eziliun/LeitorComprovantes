import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import {
  ResponseCardCupons,
  iCupons,
} from '../interfaces/cupomResponse.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CupomService {
  cupomDetailsSubject: BehaviorSubject<iCupons | null>;

  constructor(
    private http: HttpClient,
    ) {
    this.cupomDetailsSubject = new BehaviorSubject<iCupons | null>(null);
  }

  getNoImageCupons(): Observable<ResponseCardCupons> {
    return this.http
      .get<ResponseCardCupons>(environment.CuponsNoImage)
      .pipe(tap(console.log), take(1));
  }

  getAllCuponsByID(id: number): Observable<ResponseCardCupons> {
    const url = `${environment.CuponsNoImage}/${id}`;
    return this.http.get<ResponseCardCupons>(url).pipe(
      tap((res) => {
        this.cupomDetailsSubject.next(res.result[0]);
      })
    );
  }

  getCupomDetailsBehavior(): Observable<iCupons | null> {
    return this.cupomDetailsSubject.asObservable();
  }

  PutImageCupom(cupomsInfo: iCupons, file: File): Observable<iCupons> {
    const formData = new FormData();
    formData.append('imagem', file);
    formData.set('id', cupomsInfo.id.toString()) 
    formData.set('bandeira_do_cartao', cupomsInfo.bandeira_do_cartao) 
    formData.set('forma_de_pagamento', cupomsInfo.forma_de_pagamento) 
    formData.set('nsu', cupomsInfo.nsu) 
    formData.set('autorizacao', cupomsInfo.autorizacao) 
    const apiURLPUT = `${environment.CuponsNoImage}/${cupomsInfo.id}`;
    return this.http.post<iCupons>(apiURLPUT, formData,);
  }
}
