import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Chamado } from '../models/chamado.model';
import { ChamadoStatus } from '../models/chamadoStatus.model';
import { Projeto } from '../models/projeto.model';
import { ChamadoTipo } from '../models/chamadoTipo.model';
import { Unidade } from '../models/unidade.model';
import { Usuario } from '../models/usuario.model';

@Injectable()
export class ChamadoDataService{

    constructor(private httpClient:HttpClient, private authService: AuthService){}

    /**
     * Método genérico para recuperação de chamados. Deve ser utilizada apenas internamente 
     * nesta classe
     */
    _genericGetChamados(url: string, pageSize: number, pageIndex: number) {
        let paginacao: string = ""
        if(pageIndex > 0) {
            let token = (url.includes("?"))? "&":"?"
            paginacao = token + "page="+pageIndex+"&per_page="+pageSize
        } 

        url = url + paginacao
        return this.httpClient.get<any>(url)
        .pipe(map(res =>{
            let chamados:Chamado[] = [];
            for (var key in res["data"]) {
                let chamado: Chamado;
                chamado = <Chamado>res["data"][key];
                chamado.status = <ChamadoStatus>res["data"][key]["status"];
                chamado.projeto = <Projeto>res["data"][key]["projeto_cnme"];
                chamado.projeto_id = (chamado.projeto != null)? chamado.projeto.id : null
                chamado.tipo = <ChamadoTipo>res["data"][key]["tipo"];
                chamado.unidade_responsavel = <Unidade>res["data"][key]["unidade_responsavel"];
                chamado.unidade_responsavel_id = (chamado.unidade_responsavel != null)? chamado.unidade_responsavel.id : null
                chamado.usuario_responsavel = <Usuario>res["data"][key]["usuario_responsavel"];
                chamado.usuario_responsavel_id = (chamado.usuario_responsavel != null)? chamado.usuario_responsavel.id :  null
                chamado.usuario = <Usuario>res["data"][key]["usuario"];
                chamado.usuario_id = (chamado.usuario != null)? chamado.usuario.id :  null
                chamados.push(chamado);
            }
            if(pageIndex <= 0) {
                return chamados;
            } else {
                let resultado : any = {}
                resultado['chamados'] = chamados
                resultado['links'] = res["links"]
                resultado['meta'] = res["meta"]
                return resultado                
            }
        }));
    }
    
    getChamados(pageSize: number, pageIndex: number) {
        return this._genericGetChamados("/api/chamados", pageSize, pageIndex)
    }

    getAllChamados() {
        return this.getChamados(1000, 1)
    }
}