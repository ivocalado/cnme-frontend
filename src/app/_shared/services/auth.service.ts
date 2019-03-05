import { Injectable } from '@angular/core';
import { Observable , of, throwError} from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
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
					if (user && user.token) {
						this.setToken(user.token);
						this.setCurrentUser(email);
					}
					return user;
				}),
				catchError(this.handleError)
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
            catchError(this.handleError)
        )
    }



	logout() {
		this._remoteLogout().subscribe(msg => {
			console.log("Usuário deslogado com sucesso.")	
		},
		error => {
			console.log("Ocorreu um erro ao deslogar o usuário no backend.")
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

	getCurrentUser() {
		let item = localStorage.getItem(currentUser);

		if(item === null) {
			return null
		}			
		else 
			return JSON.parse(item);
	}

	setToken(token:string){
		localStorage.setItem(jwtTokenName, token);
	}

	getToken() {
		return localStorage.getItem(jwtTokenName);
	}

	get isAuthenticated() {
		const helper = new JwtHelperService();
		let token = this.getToken();
		if (token != null && helper.isTokenExpired(token)){
			this.logout();
		}
		return token != null;
	}

	private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof Error) {
            return throwError("client-side error");
        } else {
            return throwError(errorResponse.error.error);
        }
    }
}
