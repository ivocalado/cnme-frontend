
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

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof Error) {
            return throwError("client-side error");
        } else {
            return throwError(errorResponse.error.messages);
        }

    }

    storeKit(kit: Kit, usuario_id: number): Observable<Kit> {
        kit.usuario_id = usuario_id
        return this.httpClient
            .post<Kit>(
                "/api/kits",
                kit,
                {
                    headers: new HttpHeaders({
                        "Content-Type":
                            "application/json; charset=UTF-8",
                        "Authorization": 'Bearer '+this.authService.getToken()
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
                        "application/json; charset=UTF-8",
                        "Authorization": 'Bearer '+this.authService.getToken()
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
                        "application/json; charset=UTF-8",
                        "Authorization": 'Bearer '+this.authService.getToken()
                })
            }
        )
    }

    updateKit(id:number, kit:Kit){
        return this.httpClient.put("/api/kits/"+id, kit, {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+this.authService.getToken()
            })
        })
        .pipe(
            catchError(this.handleError)
        )
    }

    getKits(){
        return this.httpClient.get<Kit[]>("/api/kits", {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+this.authService.getToken()
            })
        })
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
        return this.httpClient.get<Kit>("/api/kits/"+id, {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+this.authService.getToken()
            })
        })
        .pipe(
            map(res =>{
                let kit:Kit;
                kit = res["data"];
                return kit;
            })
        );
    }

    deleteKit(id:number){
        return this.httpClient.delete("/api/kits/"+id, {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+this.authService.getToken()
            })
        });
    }
}

