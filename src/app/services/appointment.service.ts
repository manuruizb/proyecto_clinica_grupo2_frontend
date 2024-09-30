import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../models/appointment-model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  urlApi = `${environment.apiUrl}/api/v1/Appointment/`

  constructor(private http: HttpClient) { }

  getList() {
    return this.http.get<Appointment[]>(this.urlApi);
  }

  create(obj: Appointment) {
    return this.http.post<Appointment>(this.urlApi, obj);
  }

  update(obj: Appointment, id: number) {
    return this.http.put<Appointment>(`${this.urlApi}${id}/`, obj);
  }

  read(id: number) {
    return this.http.get<Appointment>(`${this.urlApi}${id}/`);
  }

  delete(id: number) {
    return this.http.delete(`${this.urlApi}${id}/`);
  }

}
