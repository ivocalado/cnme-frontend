
import { Usuario } from "../models/usuario.model";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class UsuarioDataService {

    constructor(private httpClient: HttpClient) {}

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof Error) {
            return throwError("client-side error");
        } else {
            return throwError(errorResponse.error.messages);
        }

    }

    storeUsuario(usuario: Usuario): Observable<Usuario> {
        usuario.name = usuario.nome
        return this.httpClient
            .post<Usuario>(
                "/api/usuarios",
                usuario,
                {
                    headers: new HttpHeaders({
                        "Content-Type":"application/json; charset=UTF-8"
                    })
                }
            )
            .pipe( map(data => data), catchError(this.handleError));
    }

    updateUsuario(id:number, usuario:Usuario){
        usuario.name = usuario.nome
        return this.httpClient.put("/api/usuarios/"+id, usuario)
        .pipe(
            catchError(this.handleError)
        )
    }

    getUsuarios(){
        return this.httpClient.get<Usuario[]>("/api/usuarios")
        .pipe(
            map(res =>{
                let usuarios:Usuario[] = [];
                for(var key in res["data"]){
                    let usuario:Usuario;
                    usuario = <Usuario>res["data"][key];
                    usuario.unidade_id = usuario.unidade.id
                    usuarios.push(usuario);
                }
                return usuarios;
            })
        );
    }

    getUsuario(id:number){
        return this.httpClient.get<Usuario>("/api/usuarios/"+id)
        .pipe(
            map(res =>{
                let usuario:Usuario;
                usuario = res["data"];
                usuario.unidade_id = usuario.unidade.id
                return usuario;
            })
        );
    }

    deleteUsuario(id:number){
        return this.httpClient.delete("/api/usuarios/"+id);
    }

    getTiposUsuarios() {
        return this.httpClient.get("/api/usuarios/u/tipos")
        .pipe(
            map(res =>{
                let tipos:string[] = [];
                for(var key in res){
                    let tipo:string;
                    tipo = <string>res[key];
                    tipos.push(tipo);
                }
                return tipos;
            })
        );
    }

    sendInvitation(usuario: Usuario) {
        console.log("send invitation")
        console.log(usuario)
        return this.httpClient
            .post<Usuario>(
                "/api/usuarios/convidar",
                usuario,
                {
                    headers: new HttpHeaders({
                        "Content-Type":"application/json; charset=UTF-8"
                    })
                }
            )
            .pipe( map(data => data), catchError(this.handleError));
    }
    
}

