
import { Kit } from "../models/kit.model";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class KitDataService {
    novos_equipamentos_ids;
    antigos_equipamentos_ids;
    kit: Kit;
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
            .pipe( map(res =>{
                let kit:Kit;
                kit = res["data"];
                return kit;
            }), catchError(this.handleError));
    }

    updateEquipamentosToKit(kit_id: number, novos_equipamentos_ids: number[]) {
        
        console.log("Passo 1")
        console.log("==updateEquipamentosToKit==")
        console.log(kit_id)
        console.log(novos_equipamentos_ids)
        this.novos_equipamentos_ids = novos_equipamentos_ids;
        let result
        console.log("Passo 2")
        this.getKit(kit_id).subscribe((kit:Kit) => {
            console.log("Passo 4")
            this.kit = kit
            this.antigos_equipamentos_ids = []
            kit.equipamentos.forEach(equipamento => 
                this.antigos_equipamentos_ids.push(equipamento.id)
            );

            console.log("Passo 5")

            let idsToRemove = []
            this.antigos_equipamentos_ids.forEach(elem => {
                if(!(elem in this.novos_equipamentos_ids)) {
                    idsToRemove.push(elem)
                }
            });
            console.log("Passo 6")
            this._removeEquipamentosFromKit(kit_id, idsToRemove).subscribe((kit:Kit) => {
                console.log("Passo 8")
               let idsToAdd = []
               this.novos_equipamentos_ids.forEach(elem => {
                   if(!(elem in this.antigos_equipamentos_ids)) {
                        idsToAdd.push(elem)
                   }
               }) 
               console.log("Passo 9")
               this._addEquipamentosToKit(kit_id, idsToAdd)
               console.log("Passo 10")
            });
            console.log("Passo 7")
        });
        console.log("Passo 3")
       
    }

    _removeEquipamentosFromKit(kit_id: number, ids: number[]) {
        console.log("_removeEquipamentosFromKit")
        console.log("kit_id = "+ kit_id)
        console.log("ids = " + ids)
        return this.httpClient.request('delete', "/api/kits/"+kit_id+"/remove-equipamentos", 
            {
                body: {ids: ids}, 
                headers: new HttpHeaders({
                    "Content-Type":
                        "application/json; charset=UTF-8"
                })
            }
        )
    }

    _addEquipamentosToKit(kit_id: number, ids: number[]) {
        console.log("_addEquipamentosToKit")
        console.log("kit_id = "+ kit_id)
        console.log("ids = " + ids)
        let result = this.httpClient.post<number[]>("/api/kits/"+kit_id+"/add-equipamentos", ids, {
            headers: new HttpHeaders({
                "Content-Type":
                    "application/json; charset=UTF-8"
            })
        })
        console.log("saida!")
        console.log(result)
        return result.pipe( map(data => data), catchError(this.handleError));
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

