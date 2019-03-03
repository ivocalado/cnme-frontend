import { Injectable } from '@angular/core';
import { Observable , of} from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UsuarioDataService } from './usuario-data.service';
import { Usuario } from '../models/usuario.model';

export const jwtTokenName: string = 'jwtToken';
export const currentUser: string = 'currentUser';

@Injectable()
export class AuthService {
	//isLoggedIn = false;
	//baseUrl: string = "https://localhost:5001";
	redirectUrl: string; // store the URL so we can redirect after logging in
	//token: string;

	constructor(private httpClient: HttpClient, private usuarioDataService: UsuarioDataService) {}

	login(email: string, password: string) {
		const body = { email: email, password: password };

		return this.httpClient
			.post<any>("/api/login", body)
			.pipe(
				map(user => {
					console.log(user.token);
					if (user && user.token) {
						this.setToken(user.token);
						this.setCurrentUser(email);
					}
					return user;
				}),
				catchError(this.handleError("login", []))
			);
	}

	_remoteLogout(){
        return this.httpClient.get("/api/logout", {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+this.getToken()
            })
        } 
        )
        .pipe(
            catchError(this.handleError("logout", []))
        )
    }



	logout() {
		this._remoteLogout().subscribe(msg => {
			console.log("REALIZAR impressão de mensagem de erro")	
		})
		localStorage.removeItem(jwtTokenName);
		localStorage.removeItem(currentUser);
	}

	setCurrentUser(email:string){
		
		this.usuarioDataService.getUsuarioByEmail(email, this.getToken()).subscribe(usuario => {
			
			
			localStorage.setItem(
				'currentUser', JSON.stringify(usuario)
			)
		})
	}

	getCurrentUser(caller: string) {
		console.log(caller + "-> getCurrentUser")
		let item = localStorage.getItem(currentUser);

		console.log(item)
		if(item === null) {
			console.log("Entrou em nullllllll")
			return null
		}			
		else 
			return <Usuario>JSON.parse(item);
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
