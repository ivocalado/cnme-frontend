
import { Kit } from "../models/kit.model";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable()
export class KitDataService {
    novos_equipamentos_ids;
    antigos_equipamentos_ids;
    kit: Kit;
    constructor(private httpClient: HttpClient, private authService: AuthService) {}

    /*private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof Error) {
            return throwError("client-side error");
        } else {
            return throwError(errorResponse.error.messages);
        }

    }*/

    storeKit(kit: Kit, usuario_id: number): Observable<Kit> {
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
            }));
    }

    updateEquipamentosToKit(kit_id: number, novos_equipamentos_ids: number[]) {
        this.novos_equipamentos_ids = novos_equipamentos_ids;
        let result
        this.getKit(kit_id).subscribe((kit:Kit) => {
            this.kit = kit
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
               this._addEquipamentosToKit(kit_id, idsToAdd).subscribe(err => {})
            });
        });

    }

    _removeEquipamentosFromKit(kit_id: number, ids: number[]) {
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

        return this.httpClient.request('post', "/api/kits/"+kit_id+"/add-equipamentos",
            {
                body: {ids: ids},
                headers: new HttpHeaders({
                    "Content-Type":
                        "application/json; charset=UTF-8"
                })
            }
        )
    }

    updateKit(id:number, kit:Kit){
        return this.httpClient.put("/api/kits/"+id, kit)
    }

    getAllKits() {
        return this.getKits(1000, 1)
    }

    getKits(pageSize: number, pageIndex: number){
        let url: string = "/api/kits"
        let paginacao: string = ""
        if(pageIndex > 0) {
            let token = (url.includes("?"))? "&":"?"
            paginacao = token + "page="+pageIndex+"&per_page="+pageSize
        } 

        url = url + paginacao
        
        return this.httpClient.get<any>(url)
        .pipe(
            map(res =>{
                let resultado : any = {}
                let kits:Kit[] = [];
                for(var key in res["data"]){
                    let kit:Kit;
                    kit = <Kit>res["data"][key];
                    kits.push(kit);
                }
                resultado['kits'] = kits
                resultado['links'] = res["links"]
                resultado['meta'] = res["meta"]
                return resultado
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

