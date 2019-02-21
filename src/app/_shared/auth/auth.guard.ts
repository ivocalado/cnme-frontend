import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationDataService } from '../services/authentication-data.service';


@Injectable()
export class Permissions {
	permissions: {}
	constructor(private authenticationDataService : AuthenticationDataService) {

	}	

	canActivate() {
		console.log("Permissions => canActivate")
		return true
	}

	canActivateChild() {
		console.log("Permissions => canActivateChild")
		return true
	}
}

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild  {
	permissions: Permissions
    constructor(private router: Router, private authenticationDataService: AuthenticationDataService) {
        this.permissions = new Permissions(this.authenticationDataService)
     }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
	{

		let url: string = state.url
		console.log("URL acessada: " + url)
		return this.permissions.canActivate();
		// return this.checkLogin(url, next.data.roles);
	}

	canActivateChild(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
	{

		let url: string = state.url
		console.log("URL acessada: " + url)
		return this.permissions.canActivateChild()
		// return this.checkLogin(url, next.data.roles);
	}
    

}

