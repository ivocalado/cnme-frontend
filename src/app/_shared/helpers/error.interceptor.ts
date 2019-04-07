import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from '../services/auth.service';

//import { AuthenticationService } from '@/_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(err => {
                /*if ([401, 403].indexOf(err.status) !== -1) {
                    this.authenticationService.logout();
                    location.reload(true);
                }*/

                if ([422].indexOf(err.status) !== -1) {
                    console.log("Erro 422: A identidade não pode ser processada.");
                }


                const error =
                    err.error.error ||
                    err.error.messages ||
                    err.error.message ||
                    err.statusText;
                console.log(error)
                return throwError(error);
            })
        );
    }
}
