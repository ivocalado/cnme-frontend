
import { Kit } from "../models/kit.model";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


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

