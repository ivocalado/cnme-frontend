
import { Usuario } from "../models/usuario.model";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class UsuarioDataService {

    constructor(private httpClient: HttpClient) {}

    /*private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof Error) {
            return throwError("client-side error");
        } else {
            return throwError(errorResponse.error.message);
        }
    }*/

    storeUsuario(usuario: Usuario, authToken: string): Observable<Usuario> {
        return this.httpClient
            .post<Usuario>(
                "/api/usuarios",
                usuario
            )
            .pipe(  map(res =>{
                let usuario:Usuario;
                usuario = res["data"];
                usuario.unidade_id = usuario.unidade.id
                return usuario;
            }));//, catchError(this.handleError));
    }

    updateUsuario(id:number, usuario:Usuario, authToken: string){
        return this.httpClient.put("/api/usuarios/"+id, usuario)
        //.pipe(catchError(this.handleError))
    }

    getUsuarios(authToken: string){
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

    getUsuario(id:number, authToken: string){
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

    getUsuarioByInvitationToken(token:string){
        return this.httpClient.get<Usuario>("/api/usuarios/get?token1="+token)
        .pipe(
            map(res =>{
                let usuario:Usuario;
                usuario = res["data"];
                usuario.unidade_id = usuario.unidade.id
                return usuario;
            })
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
            })
        );
    }

    getUsuarioByEmail(email:string, authToken: string){
        const body = { email: email};
        return this.httpClient.post<Usuario>("/api/usuarios/login/email", body)
        .pipe(
            map(res =>{
                let usuario:Usuario;
                usuario = res["data"];
                usuario.unidade_id = usuario.unidade.id
                return usuario;
            })
        );
    }

    deactivateUsuario(id:number, authToken: string){
        return this.httpClient.delete("/api/usuarios/"+id);
    }

    reactivateUsuario(id:number, authToken: string){
        return this.httpClient.get("/api/usuarios/"+id+"/restaurar").pipe(
            map(res =>{
                let usuario:Usuario;
                usuario = res["data"];
                usuario.unidade_id = usuario.unidade.id
                return usuario;
            })
        );
    }

    getTiposUsuarios(authToken: string) {
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

    sendInvitation(usuarioId: number, authToken: string) {
        return this.httpClient
            .post<any>(
                "/api/usuarios/"+usuarioId+"/enviar-convite", null,
                {
                    headers: new HttpHeaders({
                        "Content-Type":"application/json; charset=UTF-8"
                    })
                }
            )
            //.pipe( map(data => data), catchError(this.handleError));
    }

    sendPasswordRecover(email: string) {
        return this.httpClient
            .get<any>("/api/novasenha/"+email)
            .pipe( map(
                res =>{
                    return res.message;
                }
            ));
    }

    validatePassword(email: string, token: string) {
        return this.httpClient
            .get<any>("/api/novasenha/validar/"+email+"/"+token)
            .pipe( map(
                res =>{
                    let usuario:Usuario;
                    usuario = res["data"];
                    usuario.unidade_id = usuario.unidade.id
                    return usuario;
                }
            ));
    }

    updateUserPasswordAfterRecover(id: number, newPassword: string) {
        return this.httpClient.post<Usuario>("/api/novasenha/usuario/"+id+"/atualizar", {password: newPassword})
        .pipe(
            map(res =>{
                let usuario:Usuario;
                usuario = res["data"];
                usuario.unidade_id = usuario.unidade.id
                return usuario;
            })
        );
    }



    /**
     * Retorna a lista de gestores responsáveis po unidade que ainda não confirmaram
     * o acesso à plataforma
     * @param authToken
     */
    getGestoresNaoConfirmados(pageIndex: number, authToken: string) {
        let paginacao: string = ""
        if(pageIndex > 0) {
            paginacao = "?page=" + pageIndex
        }
        let url = "/api/usuarios/u/gestores-nao-confirmados" + paginacao

        return this.httpClient.get<any>(url)
        .pipe(
            map(res =>{
                if(pageIndex <= 0) {
                    let usuarios:Usuario[] = [];
                    for(var key in res["data"]){
                        let usuario:Usuario;
                        usuario = <Usuario>res["data"][key];
                        usuario.unidade_id = usuario.unidade.id
                        usuarios.push(usuario);
                    }
                    return usuarios;
                } else {
                    let resultado : any = {}
                    let usuarios:Usuario[] = [];
                    for(var key in res["data"]){
                        let usuario:Usuario;
                        usuario = <Usuario>res["data"][key];
                        usuario.unidade_id = usuario.unidade.id
                        usuarios.push(usuario);
                    }
                    resultado['usuarios'] = usuarios
                    resultado['links'] = res["links"]
                    resultado['meta'] = res["meta"]
                    return resultado 
                }                
            })
        );
    }

}

