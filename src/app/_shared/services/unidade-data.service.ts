
import { Unidade } from "../models/unidade.model";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Localidade } from '../models/localidade.model';
import { Estado } from '../models/estado.model';
import { Usuario } from "../models/usuario.model";
import { AuthService } from './auth.service';

@Injectable()
export class UnidadeDataService {

    constructor(private httpClient: HttpClient, private authService: AuthService) {}

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof Error) {
            return throwError("client-side error");
        } else {
            return throwError(errorResponse.error.messages);
        }

    }

    storeUnidade(unidade: Unidade, tipoUnidadeId: number, classe:string): Observable<Unidade> {
        unidade.tipo_unidade_id = tipoUnidadeId;
        unidade.classe = classe;
        return this.httpClient
            .post<Unidade>(
                "/api/unidades",
                unidade,
                {
                    headers: new HttpHeaders({
                        "Content-Type":"application/json; charset=UTF-8"
                    })
                }
            )
            .pipe(
                map(res =>{
                let unidade:Unidade;
                unidade = res["data"];
                return unidade;
            }),
                catchError(this.handleError));
    }

    updateUnidade(id:number, unidade:Unidade){
        return this.httpClient.put("/api/unidades/"+id, unidade)
        .pipe(
            catchError(this.handleError)
        )
    }

    getUnidades(){
        return this.httpClient.get<Unidade[]>("/api/unidades")
        .pipe(
            map(res =>{
                let unidades:Unidade[] = [];
                for(var key in res["data"]){
                    let unidade:Unidade;
                    unidade = <Unidade>res["data"][key];
                    if (!unidade["localidade"]) {
                        unidade.localidade = new Localidade("", "", "", "", "", "",null, null,null,null);
                        unidade.localidade.estado = new Estado(null,"","");
                    }
                    unidades.push(unidade);
                }
                return unidades;
            })
        );
    }

    getUsuariosAtivosByUnidade(id_unidade:number) {
        return this.httpClient.get<Usuario[]>("/api/unidades/"+id_unidade+"/usuarios")
        .pipe(
            map(res =>{
                let usuarios:Usuario[] = [];
                for(var key in res["data"]){
                    let usuario:Usuario;
                    usuario = <Usuario>res["data"][key];
                    if(!usuario.removido) {
                        usuario.unidade_id = usuario.unidade.id
                        usuarios.push(usuario);
                    }
                }
                return usuarios;
            })
        );
    }

    getUsuariosInativosByUnidade(id_unidade:number) {
        return this.httpClient.get<Usuario[]>("/api/unidades/"+id_unidade+"/usuarios")
        .pipe(
            map(res =>{
                let usuarios:Usuario[] = [];
                for(var key in res["data"]){
                    let usuario:Usuario;
                    usuario = <Usuario>res["data"][key];
                    if(usuario.removido) {
                        usuario.unidade_id = usuario.unidade.id
                        usuarios.push(usuario);
                    }
                }
                return usuarios;
            })
        );
    }

    getUnidade(id:number){
        return this.httpClient.get<Unidade>("/api/unidades/"+id)
        .pipe(
            map(res =>{
                let unidade:Unidade;
                unidade = res["data"];
                return unidade;
            })
        );
    }

    getTvEscola(){
        return this.httpClient.get<Unidade>("/api/unidades/u/tvescola")
        .pipe(
            map(res =>{
                let unidade:Unidade;
                unidade = res["data"];
                return unidade;
            })
        );
    }

    getMec(){
        return this.httpClient.get<Unidade>("/api/unidades/u/mec")
        .pipe(
            map(res =>{
                let unidade:Unidade;
                unidade = res["data"];
                return unidade;
            })
        );
    }

    deleteUnidade(id:number){
        return this.httpClient.delete("/api/unidades/"+id);
    }

    getPolos(){
        return this.httpClient.get<Unidade[]>("/api/unidades/u/polos")
        .pipe(
            map(res => {
                let unidades: Unidade[] = [];
                for (var key in res["data"]) {
                    let unidade: Unidade;
                    unidade = <Unidade>res["data"][key];
                    if (!unidade["localidade"]) {
                        unidade.localidade = Localidade.EMPTY_MODEL;
                        unidade.localidade.estado = Estado.EMPTY_MODEL;
                    }
                    unidades.push(unidade);
                }

                // verifica se o usuario logado é polo e retorna somente seu polo
                // verificar a possibilidade e adicionar uma query na chamada da api para melhorar performance
                    let q = "";
                    let usuarioAutenticado = this.authService.getCurrentUser();
                    let classe = usuarioAutenticado.unidade.classe
                    if (classe == "polo") {
                        let polo:Unidade;
                        polo = unidades.find(obj => obj.nome == usuarioAutenticado.unidade.nome);
                        unidades = [];
                        unidades.push(polo);
                    }
                //
                return unidades;
            })
        );
    }

    getEmpresas() {
        return this.httpClient.get<Unidade[]>("api/unidades/u/empresas")
            .pipe(
                map(res => {
                    let unidades: Unidade[] = [];
                    for (var key in res["data"]) {
                        let unidade: Unidade;
                        unidade = <Unidade>res["data"][key];
                        if (!unidade["localidade"]) {
                            unidade.localidade = Localidade.EMPTY_MODEL;
                            unidade.localidade.estado = Estado.EMPTY_MODEL;
                        }
                        unidades.push(unidade);
                    }
                    return unidades;
                })
            );
    }
}

