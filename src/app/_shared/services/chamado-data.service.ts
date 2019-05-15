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
import { Comentario } from '../models/comentario.model';

@Injectable()
export class ChamadoDataService{

    constructor(
        private httpClient:HttpClient, 
        private authService: AuthService
    ){}

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
    
    getChamadosAsCriador(unidade_id: number, pageSize: number, pageIndex: number) {
        let url: string = "/api/unidades/"+unidade_id+"/chamados"
        return this._genericGetChamados(url, pageSize, pageIndex)
    }

    getChamadosPolosAsCriador(pageSize: number, pageIndex: number) {
        let url: string = "/api/chamados/c/pesquisar?polos=true"
        return this._genericGetChamados(url, pageSize, pageIndex)
    }

    getChamadosAsResponsavel(unidade_id: number, pageSize: number, pageIndex: number) {
        let url: string = "/api/chamados/c/pesquisar?unidade_responsavel_id="+unidade_id
        return this._genericGetChamados(url, pageSize, pageIndex)
    }

    getChamado(id:number){
        return this.httpClient.get<Chamado>("/api/chamados/"+id)
        .pipe(map(res=>{
            let chamado: Chamado;
            chamado = <Chamado>res["data"];
            chamado.status = <ChamadoStatus>res["data"]["status"];
            chamado.projeto = <Projeto>res["data"]["projeto_cnme"];
            chamado.projeto_id = (chamado.projeto != null)? chamado.projeto.id : null
            chamado.tipo = <ChamadoTipo>res["data"]["tipo"];
            chamado.unidade_responsavel = <Unidade>res["data"]["unidade_responsavel"];
            chamado.unidade_responsavel_id = (chamado.unidade_responsavel != null)? chamado.unidade_responsavel.id : null
            chamado.usuario_responsavel = <Usuario>res["data"]["usuario_responsavel"];
            chamado.usuario_responsavel_id = (chamado.usuario_responsavel != null)? chamado.usuario_responsavel.id :  null
            chamado.usuario = <Usuario>res["data"]["usuario"];
            chamado.usuario_id = (chamado.usuario != null)? chamado.usuario.id :  null
            return chamado
        }));
    }

    getStatus() {
        return this.httpClient.get<ChamadoStatus[]>("/api/chamados/c/status")
        .pipe(map(res=>{
            let ret: ChamadoStatus[] = []

            let chamadoStatus: ChamadoStatus[] = [];
            for (var key in res["data"]) {
                let status: ChamadoStatus;
                status = <ChamadoStatus>res["data"][key];
                chamadoStatus.push(status);
            }
            return chamadoStatus;
        }));
    }

    getTipos() {
        return this.httpClient.get<ChamadoTipo[]>("/api/chamados/c/tipos")
        .pipe(map(res=>{
            let chamadoTipo: ChamadoTipo[] = [];
            for (var key in res["data"]) {
                let tipo: ChamadoTipo;
                tipo = <ChamadoTipo>res["data"][key];
                chamadoTipo.push(tipo);
            }
            return chamadoTipo;
        }));
    }  
    
    getComentarios(chamado_id: number) {
        
        return this.httpClient.get<Comentario[]>("/api/comments/chamado/"+chamado_id+"/comments")
        .pipe(map(res=>{
            let comentarios: Comentario[] = [];
            for (var key in res["data"]) {
                let comentario: Comentario;
                comentario = <Comentario>res["data"][key];
                comentarios.push(comentario);
            }
            return comentarios;
        }));
    }

    updateChamado(id: number, updates: any) {
        return this.httpClient.put<Chamado>("/api/chamados/"+id, updates)
        .pipe(map(res=>{
            let chamado: Chamado;
            chamado = <Chamado>res["data"];
            chamado.status = <ChamadoStatus>res["data"]["status"];
            chamado.projeto = <Projeto>res["data"]["projeto_cnme"];
            chamado.projeto_id = (chamado.projeto != null)? chamado.projeto.id : null
            chamado.tipo = <ChamadoTipo>res["data"]["tipo"];
            chamado.unidade_responsavel = <Unidade>res["data"]["unidade_responsavel"];
            chamado.unidade_responsavel_id = (chamado.unidade_responsavel != null)? chamado.unidade_responsavel.id : null
            chamado.usuario_responsavel = <Usuario>res["data"]["usuario_responsavel"];
            chamado.usuario_responsavel_id = (chamado.usuario_responsavel != null)? chamado.usuario_responsavel.id :  null
            chamado.usuario = <Usuario>res["data"]["usuario"];
            chamado.usuario_id = (chamado.usuario != null)? chamado.usuario.id :  null
            return chamado
        }));
    }

    storeChamado(chamadoToSave: any) {
        return this.httpClient.post<Chamado>("/api/chamados", chamadoToSave)
        .pipe(map(res=>{
            let chamado: Chamado;
            chamado = <Chamado>res["data"];
            chamado.status = <ChamadoStatus>res["data"]["status"];
            chamado.projeto = <Projeto>res["data"]["projeto_cnme"];
            chamado.projeto_id = (chamado.projeto != null)? chamado.projeto.id : null
            chamado.tipo = <ChamadoTipo>res["data"]["tipo"];
            chamado.unidade_responsavel = <Unidade>res["data"]["unidade_responsavel"];
            chamado.unidade_responsavel_id = (chamado.unidade_responsavel != null)? chamado.unidade_responsavel.id : null
            chamado.usuario_responsavel = <Usuario>res["data"]["usuario_responsavel"];
            chamado.usuario_responsavel_id = (chamado.usuario_responsavel != null)? chamado.usuario_responsavel.id :  null
            chamado.usuario = <Usuario>res["data"]["usuario"];
            chamado.usuario_id = (chamado.usuario != null)? chamado.usuario.id :  null
            return chamado
        }));
    }

    addComentario(chamado_id: number, comentario: Comentario) {
        
        return this.httpClient.post<Comentario>("/api/comments/chamado/"+chamado_id+"/add-comment", comentario)
        .pipe(map(res=>{
            return <Comentario>res["data"];
        }));
    }

    
}