import { TipoEquipamento } from "../models/tipoEquipamento.model";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable()
export class TipoEquipamentoDataService{
    constructor(private httpClient:HttpClient){}
    
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof Error) {
            return throwError("client-side error");
        } else {
            return throwError(errorResponse.error.messages);
        }

    }

    getTipoEquipamentos() {
        return this.httpClient.get<TipoEquipamento[]>("/api/tipoequipamentos")
        .pipe(
            map(res => {
                let tipoEquipamentos:TipoEquipamento[]=[];
                for (var key in res["data"]) {
                    let tipoEquipamento: TipoEquipamento;
                    tipoEquipamento = <TipoEquipamento>res["data"][key];
                    tipoEquipamentos.push(tipoEquipamento);
                }
                return tipoEquipamentos;
            })
        );
    }

	storeTipoEquipamento(tipoEquipamento: TipoEquipamento): Observable<TipoEquipamento> {
        return this.httpClient
            .post<TipoEquipamento>(
                "/api/tipoequipamentos",
                tipoEquipamento,
                {
                    headers: new HttpHeaders({
                        "Content-Type":
                            "application/json; charset=UTF-8"
                    })
                }
            )
            .pipe( map(data => data), catchError(this.handleError));
	}

	updateTipoEquipamento(id:number, tipoEquipamento:TipoEquipamento){
	        return this.httpClient.put("/api/tipoequipamentos/"+id, tipoEquipamento)
        .pipe(
            catchError(this.handleError)
        )
    }

    getTipoEquipamento(id:number){
        return this.httpClient.get<TipoEquipamento>("/api/tipoequipamentos/"+id)
        .pipe(
            map(res =>{
                let tipoEquipamento:TipoEquipamento;
                tipoEquipamento = res["data"];
                return tipoEquipamento;
            })
        );
     }

     deleteTipoEquipamento(id:number){
        return this.httpClient.delete("/api/tipoequipamentos/"+id);
    }




}