
import { Usuario } from "../models/usuario.model";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class AuthenticationDataService {

    constructor(private httpClient: HttpClient) {}

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof Error) {
            return throwError("client-side error");
        } else {
            return throwError(errorResponse.error.messages);
        }

    }

    getSessionUser(): Observable<Usuario> {
        return this.httpClient.get<Usuario>("/api/usuarios/2")
        .pipe(
            map(res =>{
                let usuario:Usuario;
                usuario = res["data"];
                usuario.unidade_id = usuario.unidade.id
                return usuario;
            })
        );
    }
}

