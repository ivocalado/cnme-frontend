
import { Polo } from '../polos/polos.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { PoloService } from '../polos/polo.service';


@Injectable()
export class PoloDataService {

    constructor(
        private httpClient: HttpClient,
        private poloService:PoloService
    ) { }

    storePolo(polo:Polo) {
        let polos = this.poloService.getPolos();
        polos.push(polo);
        return this.httpClient.put("https://cnme-8ab59.firebaseio.com/polos.json", polos);
    }

    getPolos(){
        return this.httpClient.get<Polo[]>("https://cnme-8ab59.firebaseio.com/polos.json")
    }
}