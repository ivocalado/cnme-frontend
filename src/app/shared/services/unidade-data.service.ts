
import { Unidade } from "../models/unidade.model";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class UnidadeDataService {

    constructor(private httpClient: HttpClient) {}

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = "";
        if (errorResponse.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = "An error occurred:", errorResponse.error.message;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            //errorMessage = `Backend returned code ${errorResponse.status}, body was: ${errorResponse.error}`;
            //errorMessage = Object.getOwnPropertyDescriptor(errorResponse, "message");
        }
        console.log(errorResponse);
        for (var item in errorResponse.error.messages) {
            console.log(errorResponse.error.messages[item]);
        }
        return throwError(errorResponse.error.messages);

    }

    storeUnidade(unidade: Unidade): Observable<Unidade> {
        unidade.tipo_unidade_id = 1;
        return this.httpClient
            .post<Unidade>(
                "http://cnme-dev.nees.com.br:8080/api/unidades",
                unidade,
                {
                    headers: new HttpHeaders({
                        "Content-Type":
                            "application/json; charset=UTF-8"
                    })
                }
            )
            .pipe( map(data => data), catchError(this.handleError));
    }

    getUnidades(){
        return this.httpClient.get<Unidade[]>("http://cnme-dev.nees.com.br:8080/api/unidades")
        .pipe(
            map(res =>{
                let unidades:Unidade[] = [];

            })
        );
    }
}

