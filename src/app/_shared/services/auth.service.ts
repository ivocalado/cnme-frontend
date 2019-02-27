import { Injectable } from '@angular/core';
import { Observable , of} from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

export const jwtTokenName: string = 'jwtToken';
export const currentUser: string = 'currentUser';

@Injectable({
	providedIn: "root"
})
export class AuthService {
	//isLoggedIn = false;
	//baseUrl: string = "https://localhost:5001";
	redirectUrl: string; // store the URL so we can redirect after logging in
	//token: string;

	constructor(private httpClient: HttpClient) {}

	login(email: string, password: string) {
		const body = { email: email, password: password };

		return this.httpClient
			.post<any>("/api/login", body)
			.pipe(
				map(user => {
					console.log(user.token);
					if (user && user.token) {
						this.setToken(user.token);
						this.setCurrentUser(user.token);
					}
					return user;
				}),
				catchError(this.handleError("login", []))
			);
	}

	logout(): void {
		localStorage.removeItem(jwtTokenName);
		localStorage.removeItem(currentUser);
	}

	setCurrentUser(token:string){
		let decodedToken = new JwtHelperService().decodeToken(token);
		let userName = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
		let userRoles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];


		localStorage.setItem(
			'currentUser', JSON.stringify({
				name: userName,
				roles: userRoles
			})
		)
	}

	getCurrentUser() {
		return  JSON.parse(localStorage.getItem(currentUser));
	}

	setToken(token:string){
		localStorage.setItem(jwtTokenName, token);
	}

	getToken() {
		return localStorage.getItem(jwtTokenName);
	}

	isAuthenticated() {
		const helper = new JwtHelperService();
		let token = this.getToken();
		if (token != null && helper.isTokenExpired(token)){
			this.logout();
		}
		//console.log(helper.decodeToken(token)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
		return token != null;
	}

	private handleError<T>(operation = "operation", result?: T) {
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			console.log(`${operation} failed: ${error.message}`);

			console.log(error.error);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
}
