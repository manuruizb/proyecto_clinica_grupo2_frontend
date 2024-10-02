import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '../models/menu-model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getMenu(){
    return this.http.get<Menu[]>('json/menu.json');
  }
}
