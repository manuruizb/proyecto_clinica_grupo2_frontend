import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Patients } from '../models/patients-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  urlApi = `${environment.apiUrl}/api/v1/Patients/`

  constructor(private http: HttpClient) { }

  getList() {
    return this.http.get<Patients[]>(this.urlApi);
  }

  create(obj: Patients) {
    return this.http.post<Patients>(this.urlApi, obj);
  }

  update(obj: Patients, id: number) {
    return this.http.put<Patients>(`${this.urlApi}${id}/`, obj);
  }

  read(id: number) {
    return this.http.get<Patients>(`${this.urlApi}${id}/`);
  }

  delete(id: number) {
    return this.http.delete(`${this.urlApi}${id}/`);
  }

  getPDFAll(): Observable<Blob> {

    return this.http.get(`${this.urlApi}export-all-pdf`, { responseType: 'blob' })
  }

  getPDFById(id: number): Observable<Blob> {

    return this.http.get(`${this.urlApi}${id}/export-pdf`, { responseType: 'blob' });
  }
}