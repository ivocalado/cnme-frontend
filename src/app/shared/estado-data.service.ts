
import { Estado } from './estado.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Localidade } from './localidade.model';
import { Municipio } from './municipio.model';

@Injectable()
export class EstadoDataService{
    constructor(private httpClient:HttpClient){}

    getEstados() {
        return this.httpClient.get<Estado[]>("http://cnme-dev.nees.com.br:8080/api/localidades/estados")
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

    getMunicipios(sigla:string){
        return this.httpClient.get<Municipio[]>(
            "http://cnme-dev.nees.com.br:8080/api/localidades/estados/" +sigla+"/municipios"
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