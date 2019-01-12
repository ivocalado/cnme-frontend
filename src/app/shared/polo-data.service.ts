
import { Polo } from '../polos/polos.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable()
export class PoloDataService {

    constructor(
        private httpClient: HttpClient
    ) { }

    storePolo(polo:Polo) {
        console.log("teste");
        return this.httpClient.put("https://cnme-8ab59.firebaseio.com/polos.json", polo);
    }
}