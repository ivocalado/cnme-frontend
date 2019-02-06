
import { Equipamento } from "../models/equipamento.model";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Localidade } from '../models/localidade.model';
import { Estado } from '../models/estado.model';

@Injectable()
export class EquipamentoDataService {

    constructor(private httpClient: HttpClient) {}

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof Error) {
            return throwError("client-side error");
        } else {
            return throwError(errorResponse.error.messages);
        }

    }

    storeEquipamento(equipamento: Equipamento, tipoEquipamentoId: number): Observable<Equipamento> {
        equipamento.tipo_equipamento_id = tipoEquipamentoId;
        return this.httpClient
            .post<Equipamento>(
                "http://cnme-dev.nees.com.br:8080/api/equipamentos",
                equipamento,
                {
                    headers: new HttpHeaders({
                        "Content-Type":
                            "application/json; charset=UTF-8"
                    })
                }
            )
            .pipe( map(data => data), catchError(this.handleError));
    }

    updateEquipamento(id:number, equipamento:Equipamento){
        equipamento.tipo_equipamento_id = 1;
        return this.httpClient.put("http://cnme-dev.nees.com.br:8080/api/equipamentos/"+id, equipamento)
        .pipe(
            catchError(this.handleError)
        )
    }

    getEquipamentos(){
        return this.httpClient.get<Equipamento[]>("http://cnme-dev.nees.com.br:8080/api/equipamentos")
        .pipe(
            map(res =>{
                let equipamentos:Equipamento[] = [];
                for(var key in res["data"]){
                    let equipamento:Equipamento;
                    equipamento = <Equipamento>res["data"][key];
                    if (!equipamento["localidade"]) {
                        equipamento.localidade = new Localidade("", "", "", "", "", "",null, null,null,null);
                        equipamento.localidade.estado = new Estado(null,"","");
                    }
                    equipamentos.push(equipamento);
                }
                return equipamentos;
            })
        );
    }

    getEquipamento(id:number){
        return this.httpClient.get<Equipamento>("http://cnme-dev.nees.com.br:8080/api/equipamentos/"+id)
        .pipe(
            map(res =>{
                let equipamento:Equipamento;
                equipamento = res["data"];
                return equipamento;
            })
        );
    }

    deleteEquipamento(id:number){
        return this.httpClient.delete("http://cnme-dev.nees.com.br:8080/api/equipamentos/"+id);
    }
}

