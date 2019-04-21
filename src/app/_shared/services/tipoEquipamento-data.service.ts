import { TipoEquipamento } from "../models/tipoEquipamento.model";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()
export class TipoEquipamentoDataService{
    constructor(private httpClient:HttpClient, private authService: AuthService){}

    /*private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof Error) {
            return throwError("client-side error");
        } else {
            return throwError(errorResponse.error.messages);
        }

    }*/

    /**
     * retorna a lista completa de equipamentos sem paginação
     */
    getAllTipoEquipamentos() {
        return this.getTipoEquipamentos(1000, 1)
    }

    getTipoEquipamentos(pageSize: number, pageIndex: number) {
        let url: string = "/api/tipoequipamentos"
        let paginacao: string = ""
        if(pageIndex > 0) {
            let token = (url.includes("?"))? "&":"?"
            paginacao = token + "page="+pageIndex+"&per_page="+pageSize
        } 

        url = url + paginacao

        return this.httpClient.get<any>(url)
        .pipe(
            map(res => {
                let tipoEquipamentos:TipoEquipamento[]=[];
                for (var key in res["data"]) {
                    let tipoEquipamento: TipoEquipamento;
                    tipoEquipamento = <TipoEquipamento>res["data"][key];
                    tipoEquipamentos.push(tipoEquipamento);
                }

                if(pageIndex <= 0) {
                    return tipoEquipamentos;
                } else {
                    let resultado : any = {}
                    resultado['tipoEquipamentos'] = tipoEquipamentos
                    resultado['links'] = res["links"]
                    resultado['meta'] = res["meta"]
                    return resultado                
                }
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
            //.pipe( map(data => data), catchError(this.handleError));
	}

	updateTipoEquipamento(id:number, tipoEquipamento:TipoEquipamento){
	        return this.httpClient.put("/api/tipoequipamentos/"+id, tipoEquipamento)
        //.pipe(catchError(this.handleError))
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
