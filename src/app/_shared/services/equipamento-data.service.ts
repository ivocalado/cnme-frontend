
import { Equipamento } from "../models/equipamento.model";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TipoEquipamento } from '../models/tipoEquipamento.model';
import { AuthService } from './auth.service';

@Injectable()
export class EquipamentoDataService {

    constructor(private httpClient: HttpClient, private authService: AuthService) {}

    /*private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof Error) {
            return throwError("client-side error");
        } else {
            return throwError(errorResponse.error.messages);
        }

    }*/

    storeEquipamento(equipamento: Equipamento, tipoEquipamentoId: number): Observable<Equipamento> {
        equipamento.tipo_equipamento_id = +tipoEquipamentoId;
        return this.httpClient
            .post<Equipamento>(
                "/api/equipamentos",
                equipamento,
                {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json; charset=UTF-8"
                    })
                }
            )
            //.pipe( map(data => data), catchError(this.handleError));
    }

    updateEquipamento(id:number, equipamento:Equipamento){
        return this.httpClient.put("/api/equipamentos/"+id, equipamento, {
            headers: new HttpHeaders({
                "Content-Type": "application/json; charset=UTF-8"
            })
        }
        )
        //.pipe(catchError(this.handleError))
    }

    getAllEquipamentos(){
        return this.getEquipamentos(1000, 1)
    }

    getEquipamentos(pageSize: number, pageIndex: number){
        let url: string = "/api/equipamentos"
        let paginacao: string = ""
        if(pageIndex > 0) {
            let token = (url.includes("?"))? "&":"?"
            paginacao = token + "page="+pageIndex+"&per_page="+pageSize
        } 

        url = url + paginacao


        return this.httpClient.get<any>(url)
        .pipe(
            map(res =>{
                     let equipamentos:Equipamento[] = [];
                for(var key in res["data"]){
                    let equipamento:Equipamento;
                    let tipoEquipamento: TipoEquipamento;
                    equipamento = <Equipamento>res["data"][key];
                    tipoEquipamento = <TipoEquipamento>res["data"][key]["tipo_equipamento"];
                    if (tipoEquipamento != null) {
                        equipamento.tipoEquipamento = tipoEquipamento;

                    } else {
                        equipamento.tipoEquipamento = TipoEquipamento.EMPTY_MODEL;
                    }
                    equipamentos.push(equipamento);
                }
                let resultado : any = {}
                if(pageIndex <= 0) {
                    return equipamentos;
                } else {
                    let resultado : any = {}
                    resultado['equipamentos'] = equipamentos
                    resultado['links'] = res["links"]
                    resultado['meta'] = res["meta"]
                    return resultado                
                }
            })
        );
    }

    getEquipamento(id:number){
        return this.httpClient.get<Equipamento>("/api/equipamentos/"+id)
        .pipe(
            map(res =>{
                let equipamento:Equipamento;
                equipamento = res["data"];
                let tipoEquipamento: TipoEquipamento;
                equipamento.tipoEquipamento = <TipoEquipamento>res["data"]["tipo_equipamento"];
                equipamento.tipo_equipamento_id = equipamento.tipoEquipamento.id;
                return equipamento;
            })
        );
    }

    deleteEquipamento(id:number){
        return this.httpClient.delete("/api/equipamentos/"+id);
    }
}

