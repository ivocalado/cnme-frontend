
import { Kit } from "../models/kit.model";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Localidade } from '../models/localidade.model';
import { Estado } from '../models/estado.model';

@Injectable()
export class KitDataService {

    constructor(private httpClient: HttpClient) {}

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof Error) {
            return throwError("client-side error");
        } else {
            return throwError(errorResponse.error.messages);
        }

    }

    storeKit(kit: Kit, tipoKitId: number): Observable<Kit> {
        kit.tipo_kit_id = tipoKitId;
        return this.httpClient
            .post<Kit>(
                "http://cnme-dev.nees.com.br:8080/api/kits",
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

    updateKit(id:number, kit:Kit){
        kit.tipo_kit_id = 1;
        return this.httpClient.put("http://cnme-dev.nees.com.br:8080/api/kits/"+id, kit)
        .pipe(
            catchError(this.handleError)
        )
    }

    getKits(){
        return this.httpClient.get<Kit[]>("http://cnme-dev.nees.com.br:8080/api/kits")
        .pipe(
            map(res =>{
                let kits:Kit[] = [];
                for(var key in res["data"]){
                    let kit:Kit;
                    kit = <Kit>res["data"][key];
                    if (!kit["localidade"]) {
                        kit.localidade = new Localidade("", "", "", "", "", "",null, null,null,null);
                        kit.localidade.estado = new Estado(null,"","");
                    }
                    kits.push(kit);
                }
                return kits;
            })
        );
    }

    getKit(id:number){
        return this.httpClient.get<Kit>("http://cnme-dev.nees.com.br:8080/api/kits/"+id)
        .pipe(
            map(res =>{
                let kit:Kit;
                kit = res["data"];
                return kit;
            })
        );
    }

    deleteKit(id:number){
        return this.httpClient.delete("http://cnme-dev.nees.com.br:8080/api/kits/"+id);
    }
}

