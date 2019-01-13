import { Polo } from './polos.model';
import { Injectable } from '@angular/core';

@Injectable()
export class PoloService{
    private polos:Polo[];

    setPolos(polos:Polo[]){
        this.polos = polos;
    }

    getPolos(){
        return this.polos;
    }
}