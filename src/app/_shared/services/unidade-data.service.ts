
import { Unidade } from "../models/unidade.model";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Localidade } from '../models/localidade.model';
import { Estado } from '../models/estado.model';

@Injectable()
export class UnidadeDataService {

    constructor(private httpClient: HttpClient) {}

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof Error) {
            return throwError("client-side error");
        } else {
            return throwError(errorResponse.error.messages);
        }

    }

    storeUnidade(unidade: Unidade, tipoUnidadeId: number): Observable<Unidade> {
        unidade.tipo_unidade_id = tipoUnidadeId;
        return this.httpClient
            .post<Unidade>(
                "http://cnme-dev.nees.com.br:8080/api/unidades",
                unidade,
                {
                    headers: new HttpHeaders({
                        "Content-Type":
                            "application/json; charset=UTF-8"
                    })
                }
            )
            .pipe( map(data => data), catchError(this.handleError));
    }

    updateUnidade(id:number, unidade:Unidade){
        unidade.tipo_unidade_id = 1;
        return this.httpClient.put("http://cnme-dev.nees.com.br:8080/api/unidades/"+id, unidade)
        .pipe(
            catchError(this.handleError)
        )
    }

    getUnidades(){
        return this.httpClient.get<Unidade[]>("http://cnme-dev.nees.com.br:8080/api/unidades")
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

    getUnidade(id:number){
        return this.httpClient.get<Unidade>("http://cnme-dev.nees.com.br:8080/api/unidades/"+id)
        .pipe(
            map(res =>{
                let unidade:Unidade;
                unidade = res["data"];
                return unidade;
            })
        );
    }

    deleteUnidade(id:number){
        return this.httpClient.delete("http://cnme-dev.nees.com.br:8080/api/unidades/"+id);
    }
}

