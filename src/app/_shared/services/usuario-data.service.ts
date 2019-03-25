
import { Usuario } from "../models/usuario.model";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class UsuarioDataService {

    constructor(private httpClient: HttpClient) {}

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof Error) {
            return throwError("client-side error");
        } else {
            return throwError(errorResponse.error.message);
        }
    }

    storeUsuario(usuario: Usuario, authToken: string): Observable<Usuario> {
        console.log("Salvandoo...")
        console.log(usuario)
        return this.httpClient
            .post<Usuario>(
                "/api/usuarios",
                usuario,
                {
                    headers: new HttpHeaders({
                        "Content-Type":"application/json; charset=UTF-8",
                        "Authorization": 'Bearer '+authToken
                    })
                }
            )
            .pipe(  map(res =>{
                let usuario:Usuario;
                usuario = res["data"];
                usuario.unidade_id = usuario.unidade.id
                return usuario;
            }), catchError(this.handleError));
    }

    updateUsuario(id:number, usuario:Usuario, authToken: string){
        console.log("updateUsuario")
        console.log(usuario)
        let result = this.httpClient.put("/api/usuarios/"+id, usuario, {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+authToken
            })
        })
        .pipe(
            catchError(this.handleError)
        )
        console.log("Saida do metodo")
        return result
    }

    getUsuarios(authToken: string){
        return this.httpClient.get<Usuario[]>("/api/usuarios", {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+authToken
            })
        })
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

    getUsuario(id:number, authToken: string){
        return this.httpClient.get<Usuario>("/api/usuarios/"+id, {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+authToken
            })
        })
        .pipe(
            map(res =>{
                let usuario:Usuario;
                usuario = res["data"];
                usuario.unidade_id = usuario.unidade.id
                return usuario;
            }), catchError(this.handleError)
        );
    }
    
    getUsuarioByInvitationToken(token:string){
        return this.httpClient.get<Usuario>("/api/usuarios/get?token1="+token)
        .pipe(
            map(res =>{
                let usuario:Usuario;
                usuario = res["data"];
                usuario.unidade_id = usuario.unidade.id
                return usuario;
            }), catchError(this.handleError)
        );
    }

    confirmInvitationToken(token:string, usuario: Usuario){
        return this.httpClient.post<Usuario>("/api/usuarios/confirmar?token1="+token, usuario)
        .pipe(
            map(res =>{
                let usuario:Usuario;
                usuario = res["data"];
                usuario.unidade_id = usuario.unidade.id
                return usuario;
            }), catchError(this.handleError)
        );
    }

    getUsuarioByEmail(email:string, authToken: string){
        const body = { email: email};
        return this.httpClient.post<Usuario>("/api/usuarios/login/email", body, {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+authToken
            })
        })
        .pipe(
            map(res =>{
                let usuario:Usuario;
                usuario = res["data"];
                usuario.unidade_id = usuario.unidade.id
                return usuario;
            }), catchError(this.handleError)
        );
    }

    deactivateUsuario(id:number, authToken: string){
        return this.httpClient.delete("/api/usuarios/"+id, {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+authToken
            })
        });
    }

    reactivateUsuario(id:number, authToken: string){
        return this.httpClient.get("/api/usuarios/"+id+"/restaurar", {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+authToken
            })
        }).pipe(
            map(res =>{
                let usuario:Usuario;
                usuario = res["data"];
                usuario.unidade_id = usuario.unidade.id
                return usuario;
            }), catchError(this.handleError)
        );
    }

    getTiposUsuarios(authToken: string) {
        return this.httpClient.get("/api/usuarios/u/tipos", {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+authToken
            })
        })
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
    
    sendInvitation(usuarioId: number, authToken: string) {
        console.log("send invitation")
        return this.httpClient
            .post<any>(
                "/api/usuarios/"+usuarioId+"/enviar-convite", null, 
                {
                    headers: new HttpHeaders({
                        "Content-Type":"application/json; charset=UTF-8",
                        "Authorization": 'Bearer '+authToken
                    })
                }
            )
            .pipe( map(data => data), catchError(this.handleError));
    }
    
}

