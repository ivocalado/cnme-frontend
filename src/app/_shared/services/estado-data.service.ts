
import { Estado } from '../models/estado.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Localidade } from '../models/localidade.model';
import { Municipio } from '../models/municipio.model';

@Injectable()
export class EstadoDataService{
    constructor(private httpClient:HttpClient){}

    getEstados() {
        return this.httpClient.get<Estado[]>("/api/localidades/estados")
        .pipe(
            map(res => {
                let estados:Estado[]=[];
                for (var key in res["data"]) {
                    let estado: Estado;
                    estado = <Estado>res["data"][key];
                    estados.push(estado);
                }
                return estados;
            })
        );
    }

    getEstadoId(sigla:string){

    }

    getMunicipios(sigla:string){
        return this.httpClient.get<Municipio[]>(
            "/api/localidades/estados/" +sigla+"/municipios"
        )
        .pipe(
            map(res =>{
                let municipios: Municipio[] = [];
                for(var key in res["data"]){
                    let municipio:Municipio;
                    municipio = <Municipio>res["data"][key];
                    municipios.push(municipio);
                }
                return municipios;
            })
        );
    }
}
