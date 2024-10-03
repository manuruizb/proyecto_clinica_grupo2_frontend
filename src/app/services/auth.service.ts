import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Auth } from '../models/auth-model';
import { ResponseToken } from '../models/token-model';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlApi = `${environment.apiUrl}/api/v1`

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  auth(obj: Auth) {
    return this.http.post<ResponseToken>(`${this.urlApi}/auth/`, obj);
  }

  refreshToken(obj: { refresh: string }) {
    return this.http.post<ResponseToken>(`${this.urlApi}/refresh/`, obj);
  }

  writeToken(responseToken: ResponseToken) {
    localStorage.setItem('token_auth', JSON.stringify(responseToken));
  }

  readToken(): ResponseToken {
    return JSON.parse(localStorage.getItem('token_auth')!);
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const responseToken = this.readToken();

    return this.refreshToken({ refresh: responseToken.refresh })
      .pipe(
        switchMap((response: ResponseToken) => {
          if (response.access) {
            const newToken = response.access;

            responseToken.access = newToken;
            this.writeToken(responseToken);

            const newRequest = request.clone({ headers: request.headers.set('Authorization', `Bearer ${newToken}`) });

            return next.handle(newRequest);
          } else {
            this.router.navigate(['']);
            return throwError(() => new Error('No se pudo renovar el token.'));
          }
        }),
        catchError((refreshError: any) => {
          this.router.navigate(['']);
          return throwError(() => new Error('No se pudo renovar el token.'));
        })
      )
  }

}
