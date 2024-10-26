import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Billing } from '../models/billing-model';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  urlApi = `${environment.apiUrl}/api/v1/Billing/`

  constructor(private http: HttpClient) { }

  getList() {
    return this.http.get<Billing[]>(this.urlApi);
  }

  create(obj: Billing) {
    return this.http.post<Billing>(this.urlApi, obj);
  }

  update(obj: Billing, id: number) {
    return this.http.put<Billing>(`${this.urlApi}${id}/`, obj);
  }

  read(id: number) {
    return this.http.get<Billing>(`${this.urlApi}${id}/`);
  }

  delete(id: number) {
    return this.http.delete(`${this.urlApi}${id}/`);
  }
}
