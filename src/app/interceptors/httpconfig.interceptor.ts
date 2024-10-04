import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import Dialogtype, { Dialog } from '../libs/dialog.lib';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})

export class HttpConfigInterceptor implements HttpInterceptor {

    loader = false;

    mivariable: boolean = (1 === 1) ? true : false;

    constructor(
        private loaderService: LoaderService,
        private router: Router,
        private authService: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.loader = false;

        if (!request.url.includes('noload')) {
            this.loaderService.show();
            this.loader = true;
        }

        if (request.headers.get("skip"))
            return next.handle(request);

        if (!request.url.includes('nocontent')) {
            if (!request.headers.has('Content-Type'))
                request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        if (!request.headers.has('Accept'))
            request = request.clone({ headers: request.headers.set('Accept', 'application/json') });


        if (!request.url.includes('auth') && !request.url.includes('refresh')){
            const tokenResponse = this.authService.readToken();
            if(tokenResponse.access){
                request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${tokenResponse.access}`) });
            }
        }

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {

                    this.loaderService.hide();
                    this.loader = false
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data: any = {};
                data = {
                    reason: JSON.stringify(error.error),
                    status: error.status,
                    detail: error.error.detail[0],
                    message: error && error.error && error.error.data ? error.error.data.error : error.message,
                    exceptionMessage: error && error.error ? error.error.exceptionMessage : error.message,
                    exceptionType: error && error.error ? error.error.exceptionType : null
                };

                if (error.status === 500) {

                    this.loaderService.hide();
                    Dialog.show('Ha ocurrido un error con el servicio', Dialogtype.error);
                    return throwError(() => new Error(data));

                }
                else if (error.status === 401) {
                    this.loaderService.hide();
                    return this.authService.handle401Error(request, next);
                }
                else {
                    this.loaderService.hide();
                    if (data.detail) {
                        Dialog.show(data.detail, Dialogtype.error);
                    }else if (data.reason) {
                        Dialog.show(data.reason, Dialogtype.warning);
                    } else {
                        Dialog.show(data.message, Dialogtype.warning);
                    }

                    return throwError(() => new Error(data));
                }

            }),
            finalize(() => { })
        );

    }
}

