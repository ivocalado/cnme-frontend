
import { Kit } from "../models/kit.model";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class KitDataService {
    novos_equipamentos_ids;
    antigos_equipamentos_ids;
    constructor(private httpClient: HttpClient) {}

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof Error) {
            return throwError("client-side error");
        } else {
            return throwError(errorResponse.error.messages);
        }

    }

    storeKit(kit: Kit, usuario_id: number): Observable<Kit> {
        kit.data_inicio = "2019-01-01"
        kit.data_fim = "2019-01-01"
        kit.usuario_id = usuario_id
        return this.httpClient
            .post<Kit>(
                "/api/kits",
                kit,
                {
                    headers: new HttpHeaders({
                        "Content-Type":
                            "application/json; charset=UTF-8"
                    })
                }
            )
            .pipe( map(data => data), catchError(this.handleError));
    }

    updateEquipamentosToKit(kit_id: number, novos_equipamentos_ids: number[]) {
        this.novos_equipamentos_ids = novos_equipamentos_ids;
        this.getKit(kit_id).subscribe((kit:Kit) => {
            this.antigos_equipamentos_ids = []
            kit.equipamentos.forEach(equipamento => 
                this.antigos_equipamentos_ids.push(equipamento.id)
            );

            let idsToRemove = []
            this.antigos_equipamentos_ids.forEach(elem => {
                if(!(elem in this.novos_equipamentos_ids)) {
                    idsToRemove.push(elem)
                }
            });
            this._removeEquipamentosFromKit(kit_id, idsToRemove).subscribe((kit:Kit) => {
               let idsToAdd = []
               this.novos_equipamentos_ids.forEach(elem => {
                   if(!(elem in this.antigos_equipamentos_ids)) {
                        idsToAdd.push(elem)
                   }
               }) 
               this._addEquipamentosToKit(kit_id, idsToAdd)
            });

        });
    }

    _removeEquipamentosFromKit(kit_id: number, ids: number[]) {
        return this.httpClient.request('delete', "/api/kits/"+kit_id+"/remove-equipamentos", {body: {ids: ids}})
    }

    _addEquipamentosToKit(kit_id: number, ids: number[]) {
        return this.httpClient.post<number[]>("/api/kits/"+kit_id+"/add-equipamentos", ids, {
            headers: new HttpHeaders({
                "Content-Type":
                    "application/json; charset=UTF-8"
            })
        }
        ).pipe( map(data => data), catchError(this.handleError));
    }

    updateKit(id:number, kit:Kit){
        return this.httpClient.put("/api/kits/"+id, kit)
        .pipe(
            catchError(this.handleError)
        )
    }

    getKits(){
        return this.httpClient.get<Kit[]>("/api/kits")
        .pipe(
            map(res =>{
                let kits:Kit[] = [];
                for(var key in res["data"]){
                    let kit:Kit;
                    kit = <Kit>res["data"][key];
                    kits.push(kit);
                }
                return kits;
            })
        );
    }

    getKit(id:number){
        return this.httpClient.get<Kit>("/api/kits/"+id)
        .pipe(
            map(res =>{
                let kit:Kit;
                kit = res["data"];
                return kit;
            })
        );
    }

    deleteKit(id:number){
        return this.httpClient.delete("/api/kits/"+id);
    }
}

