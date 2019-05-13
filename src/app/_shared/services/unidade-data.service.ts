
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

    /*private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof Error) {
            return throwError("client-side error");
        } else {
            return throwError(errorResponse.error.messages);
        }

    }*/

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
            }));
    }

    updateUnidade(id:number, unidade:Unidade){
        return this.httpClient.put("/api/unidades/"+id, unidade)
        //.pipe(catchError(this.handleError))
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

    getAllUsuariosAtivosByUnidade(id_unidade:number) {
        return this.getUsuariosAtivosByUnidade(id_unidade, -1, 1)
    }
    getUsuariosAtivosByUnidade(id_unidade:number, pageSize: number, pageIndex: number) {
        let url: string = "/api/unidades/"+id_unidade+"/usuarios"
        let paginacao: string = ""
        if(pageIndex > 0) {
            let token = (url.includes("?"))? "&":"?"
            paginacao = token + "page="+pageIndex+"&per_page="+pageSize
        } 

        url = url + paginacao

        return this.httpClient.get<any>(url)
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

                if(pageIndex <= 0) {
                    return usuarios;
                } else {
                    let resultado : any = {}
                    resultado['usuarios'] = usuarios
                    resultado['links'] = res["links"]
                    resultado['meta'] = res["meta"]
                    return resultado                
                }
            })
        );
    }

    getUsuariosInativosByUnidade(id_unidade:number, pageSize: number, pageIndex: number) {
        let url: string = "/api/unidades/"+id_unidade+"/usuarios"
        let paginacao: string = ""
        if(pageIndex > 0) {
            let token = (url.includes("?"))? "&":"?"
            paginacao = token + "page="+pageIndex+"&per_page="+pageSize
        } 

        url = url + paginacao

        return this.httpClient.get<any>(url)
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
                if(pageIndex <= 0) {
                    return usuarios;
                } else {
                    let resultado : any = {}
                    resultado['usuarios'] = usuarios
                    resultado['links'] = res["links"]
                    resultado['meta'] = res["meta"]
                    return resultado                
                }
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

    getAdmin(){
        return this.httpClient.get<Unidade>("/api/unidades/u/admin")
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

    getAllPolos() {
        return this.getPolos(-1, 1)
    }

    getGestoras() {
        let url: string = "/api/unidades/u/gestoras"
        return this.httpClient.get<Unidade>(url)
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
            return unidades
        })
        );
            
    }    

    getPolos(pageSize: number, pageIndex: number){
        let usuarioAutenticado = this.authService.getCurrentUser();
        let classe = usuarioAutenticado.unidade.classe
        if (classe == "polo") {
            let url = "/api/unidades/u/polos?per_page=-1"
            

            return this.httpClient.get<any>(url)
            .pipe(
                map(res => {
                    let polo:Unidade;
                    polo = res["data"].find(obj => obj.nome == usuarioAutenticado.unidade.nome);

                let resultado : any = {}
                resultado['unidades'] = [polo]
                resultado['links'] = res["links"]
                resultado['meta'] = res["meta"]
                return resultado  
            })

            );
        } else {
            let url = "/api/unidades/u/polos"
            let paginacao: string = ""
            if(pageIndex > 0) {
                let token = (url.includes("?"))? "&":"?"
                paginacao = token + "page="+pageIndex+"&per_page="+pageSize
            }

            url = url + paginacao
            return this.httpClient.get<any>(url)
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
                let resultado : any = {}
                resultado['unidades'] = unidades
                resultado['links'] = res["links"]
                resultado['meta'] = res["meta"]
                return resultado  
            })
            );
        }


        
    }

    getEmpresas(pageSize: number, pageIndex: number) {
        let url: string = "/api/unidades/u/empresas"
        let paginacao: string = ""
        if(pageIndex > 0) {
            let token = (url.includes("?"))? "&":"?"
            paginacao = token + "page="+pageIndex+"&per_page="+pageSize
        } 

        url = url + paginacao

        return this.httpClient.get<any>(url)
            .pipe(
                map(res => {

                    let resultado : any = {}
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
                    resultado['unidades'] = unidades
                    resultado['links'] = res["links"]
                    resultado['meta'] = res["meta"]
                    return resultado;
                })
        );
    }



    getAllEmpresas() {
        return this.getEmpresas(10000, 1)
    }
}

