import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../_shared/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

	constructor(private authService:AuthService){}

	intercept(req:HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
		const copiedReq = req.clone({
			headers: req.headers.set(
				"Authorization",
				"Bearer " + this.authService.getToken()
			)
		});

        //console.log("interceptor: "+this.authService.getToken());
        //return next.handle(req);
		return next.handle(copiedReq);
	}
}
