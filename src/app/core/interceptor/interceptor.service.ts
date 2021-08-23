import { SpinnerService } from '../../shared/services/spinner.service';
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class Interceptor implements HttpInterceptor {

    private timer = 0;

    constructor(
        private router: Router,
        public spinnerService: SpinnerService,
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return this.sendRequest(request, next);
    }


    sendRequest(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        let authRequest = req;

        const started = Date.now();
        clearTimeout(this.timer);
        if (this.spinnerService.isBlock() === false) {
            this.timer = setTimeout(() => {
                this.spinnerService.blockOn();
            });
        }


        return next.handle(authRequest)
            .pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        clearTimeout(this.timer);
                        this.timer = setTimeout(() => {
                            this.spinnerService.blockOff();
                        });
                    }
                }),
                catchError(err => {
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        this.spinnerService.blockOff();
                    });

                    return throwError(err);
                })
            );
    }
}