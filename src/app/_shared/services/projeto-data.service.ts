import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projeto } from '../models/projeto.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProjetoStatus } from '../helpers/enum-helper';

@Injectable()
export class ProjetoDataService{

    constructor(private httpClient:HttpClient){}

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof Error) {
            return throwError("client-side error");
        } else {
            return throwError(errorResponse.error.messages);
        }

    }

    storeProjeto(projeto:Projeto):Observable<Projeto>{
        projeto.created_at = new Date();
        projeto.usuario_id = 1; //TODO: substituir para id do usuário logado
        projeto.status = ProjetoStatus.ABERTO;
        return this.httpClient.post<Projeto>("/api/projeto-cnme", projeto, {
            headers: new HttpHeaders({
                "Content-Type": "application/json; charset=UTF-8"
            })
        }).pipe(map(data => data), catchError(this.handleError));
    }

    updateProjeto(id:number, projeto:Projeto){
        return this.httpClient.put('/api/projeto-cnme/'+id, projeto)
        .pipe(catchError(this.handleError));
    }

    getProjetos(){
        return this.httpClient.get<Projeto[]>("/api/projeto-cnme")
        .pipe(map(res =>{
            let projetos:Projeto[] = [];
            for (var key in res["data"]) {
                let projeto: Projeto;
                projeto = <Projeto>res["data"][key];
                projetos.push(projeto);
            }
            return projetos;
        }));
    }

    getProjeto(id:number){
        return this.httpClient.get<Projeto>("/api/projeto-cnme/"+id)
        .pipe(map(res=>{
            let projeto:Projeto;
            projeto = res["data"];
            return projeto;
        }));
    }

    deleteProjeto(id: number) {
        return this.httpClient.delete("/api/projeto-cnme/" + id);
    }

}