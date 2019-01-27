
import { Polo } from '../models/polos.model';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';


@Injectable()
export class PoloDataService {
    constructor(
        private httpClient: HttpClient
    ) {}

    storePolo(polo: Polo) {
        //let polos = this.poloService.getPolos();
        //polos.push(polo);
        return this.httpClient.post("https://cnme-8ab59.firebaseio.com/polos.json",polo);
    }

    getPolos() {
        return this.httpClient.get<Polo[]>("https://cnme-8ab59.firebaseio.com/polos.json")
        .pipe(
            map(res => {
                let polos: Polo[] = [];
                for (var key in res) {
                    let polo: Polo;
                    polo = res[key];
                    polo.id = key;
                    polos.push(polo);
                }
                return polos;
            })
        );
    }

    getPolo(id: string) {
        return this.httpClient.get<Polo>("https://cnme-8ab59.firebaseio.com/polos/" +id +".json")
            .pipe(
                map(res => {
                    console.log(res);
                    return res;
                })
            );
    }

    updatePolo(id:string, polo:Polo){
        return this.httpClient.put("https://cnme-8ab59.firebaseio.com/polos/" + id + ".json", polo);
    }

    deletePolo(id: string): Observable<{}> {
        return this.httpClient
            .delete("https://cnme-8ab59.firebaseio.com/polos/" + id + ".json")
            .pipe(
                catchError(this.handleError)
            );
    }

    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error("An error occurred:", error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                    `body was: ${error.error}`
            );
        }
        // return an observable with a user-facing error message
        return throwError("Something bad happened; please try again later.");
    }
}