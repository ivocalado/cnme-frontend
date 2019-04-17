import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projeto } from '../models/projeto.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { StatusProjeto } from '../helpers/enum-helper';
import { Tarefa } from '../models/tarefa.model';
import { Etapa } from '../models/etapa.model';
import { EquipamentoProjeto } from '../models/equipamentoProjeto.model';
import { AuthService } from './auth.service';

@Injectable()
export class ProjetoDataService{

    constructor(private httpClient:HttpClient, private authService: AuthService){}

    storeProjeto(projeto:Projeto):Observable<Projeto>{
        console.log(projeto);
        projeto.usuario_id = this.authService.getCurrentUser().id; //TODO: substituir para id do usuário logado
        projeto.status = StatusProjeto.CRIADO;
        return this.httpClient.post<Projeto>("/api/projeto-cnme", projeto, {
            headers: new HttpHeaders({
                "Content-Type": "application/json; charset=UTF-8"
            })
        })//.pipe(map(data => data), catchError(this.handleError));
    }

    updateProjeto(id:number, projeto:Projeto){
        return this.httpClient.put('/api/projeto-cnme/'+id, projeto)
        //.pipe(catchError(this.handleError));
    }

    getProjeto(id:number){
        return this.httpClient.get<Projeto>("/api/projeto-cnme/"+id)
        .pipe(map(res=>{
            let projeto:Projeto;
            projeto = res["data"];
            return projeto;
        }));
    }

    deleteProjeto(id: number) {
        return this.httpClient.delete("/api/projeto-cnme/" + id);
    }

    storeEquipamentos(projetoId: number, equipamentosIds: number[]) {
        return this.httpClient.post("/api/projeto-cnme/" + projetoId + "/add-equipamentos", equipamentosIds)
            //.pipe(catchError(this.handleError));
    }

    storeKit(projetoId: number, kitId: number) {
        return this.httpClient.post("/api/projeto-cnme/" + projetoId + "/add-kit/" + kitId, null)
            //.pipe(catchError(this.handleError));
    }
    deleteKit(projetoId: number, kitId: number) {
        return this.httpClient.delete("api/projeto-cnme/" + projetoId + "/remove-kit/" + kitId);
    }

    getEtapasProjeto(projetoId: number) {
        return this.httpClient.get<Etapa[]>("/api/projeto-cnme/" + projetoId + "/etapas")
            .pipe(map(res => {
                let etapas: Etapa[] = [];
                for (var key in res["data"]) {
                    let etapa: Etapa;
                    etapa = <Etapa>res["data"][key];
                    etapas.push(etapa);
                }
                return etapas;
            }));
    }

    getEtapaEnvio(projetoId: number) {
        return this.httpClient.get<Etapa>("/api/projeto-cnme/" + projetoId + "/etapa-envio")
            .pipe(map(res => {
                let etapa: Etapa;
                etapa = res["data"];
                return etapa;
            }))
    }

    getEtapaInstalacao(projetoId: number) {
        return this.httpClient.get<Etapa[]>("api/projeto-cnme/"+projetoId+"/etapa-instalacao")
            .pipe(map(res => {
                let etapa: Etapa;
                etapa = res["data"];
                return etapa;
        }));
    }

    getEtapaAtivacao(projetoId: number) {
        return this.httpClient.get<Etapa[]>("/api/projeto-cnme/" + projetoId + "/etapa-ativacao")
            .pipe(map(res => {
                let etapa: Etapa;
                etapa = res["data"];
                return etapa;
        }));
    }

    storeTarefaEnvio(projetoId:number, tarefa:Tarefa){
        return this.httpClient.post("api/etapas/projeto-cnme/"+projetoId+"/add-tarefa-envio", tarefa)
        //.pipe(catchError(this.handleError));
    }

    storeTarefaInstalacao(projetoId: number, tarefa: Tarefa) {
        return this.httpClient.post("api/etapas/projeto-cnme/" + projetoId + "/add-tarefa-instalacao", tarefa)
            //.pipe(catchError(this.handleError));
    }

    storeTarefaAtivacao(projetoId: number, tarefa: Tarefa) {
        return this.httpClient.post("api/etapas/projeto-cnme/" + projetoId + "/add-tarefa-ativacao", tarefa)
            //.pipe(catchError(this.handleError));
    }

    deleteTarefa(tarefaId:number){
        return this.httpClient.delete("/api/tarefas/"+tarefaId)
        //.pipe(catchError(this.handleError));
    }

    deleteEtapa(etapaId:number){
        return this.httpClient.delete("/api/etapas/"+etapaId)
        //.pipe(catchError(this.handleError));
    }

    getEquipDisponiveisEnvio(projetoId:number){
        return this.httpClient.get<EquipamentoProjeto>("/api/tarefas/projeto-cnme/" +projetoId+"/equipamentos-disponiveis-envio")
            .pipe(map(res => {
                let equipamentos: EquipamentoProjeto[] = [];
                for (var key in res["data"]) {
                    let equipamento: EquipamentoProjeto;
                    equipamento = <EquipamentoProjeto>res["data"][key];
                    equipamentos.push(equipamento);
                }
                return equipamentos;
        }));
    }

    cancelProject(projetoId: number, descricao: string) {
        return this.httpClient.post("/api/projeto-cnme/" + projetoId + "/cancelar", {
            descricao: descricao
        })
            //.pipe(catchError(this.handleError));
    }

    storeEntrega(projetoId:number, tarefaId:number, values:any){
        return this.httpClient.post(
            "/api/etapas/projeto-cnme/" + projetoId + "/tarefa/" + tarefaId + "/entregar",
            values)
    }

    storeInstalacao(projetoId: number, values: any) {
        return this.httpClient.post(
            "/api/etapas/projeto-cnme/" + projetoId + "/instalar",
            values)
    }

    storeAtivacao(projetoId: number, values: any) {
        return this.httpClient.post(
            "/api/etapas/projeto-cnme/" + projetoId + "/ativar",
            values)
    }

    enviarTodasEntregas(projetoId: number) {
        return this.httpClient.post("/api/etapas/projeto-cnme/"+ projetoId+"/enviar-all", null)
            //.pipe(catchError(this.handleError));
    }


    /**
     * Método genérico para recuperação de projetos. Deve ser utilizada apenas internamente 
     * nesta classe
     */
    _genericGetProjetos(url: string, pageIndex: number) {
        let paginacao: string = ""
        if(pageIndex > 0) {
            let token = (url.includes("?"))? "&":"?"
            paginacao = token + "page="+pageIndex
        } 

        url = url + paginacao

        return this.httpClient.get<any>(url)
        .pipe(map(res =>{
            if(pageIndex <= 0) {
                let projetos:Projeto[] = [];
                for (var key in res["data"]) {
                    let projeto: Projeto;
                    projeto = <Projeto>res["data"][key];
                    projetos.push(projeto);
                }
                return projetos;
    
            } else {
                let resultado : any = {}
                let projetos:Projeto[] = [];
                for (var key in res["data"]) {
                    let projeto: Projeto;
                    projeto = <Projeto>res["data"][key];
                    projetos.push(projeto);
                }
                resultado['projetos'] = projetos
                resultado['links'] = res["links"]
                resultado['meta'] = res["meta"]
                return resultado                
            }
        }));
    }

    getProjetos(pageIndex: number){
        // verifica se o usuario logado é polo e retorna somente seus projetos
        let q = "";
        let usuarioAutenticado = this.authService.getCurrentUser();
        let classe = usuarioAutenticado.unidade.classe
        let url = ""
        if(classe=="polo"){
            url = "/api/projeto-cnme/p/pesquisar?q="+ + usuarioAutenticado.unidade.nome
        } else {
            url = "/api/projeto-cnme"
        }

        return this._genericGetProjetos(url, pageIndex)
        //
    }


    getProjetosAtrasados(pageIndex: number) {
        return this._genericGetProjetos("/api/projeto-cnme/p/atrasados", pageIndex) 
    }


    /**
     * 
     * @param status 
     * @param pageIndex se <=0 recuperar todos os registros 
     */
    getProjetosPorStatus(status: string, pageIndex: number) {
        return this._genericGetProjetos("/api/projeto-cnme/p/pesquisar?status="+status, pageIndex) 
    }

    getProjetosEmPlanejamento(pageIndex: number) {
        return this.getProjetosPorStatus("PLANEJAMENTO", pageIndex)
    }

    getProjetosEnviados(pageIndex: number) {
        return this.getProjetosPorStatus("ENVIADO", pageIndex)
    }

    getProjetosEntregues(pageIndex: number) {
        return this.getProjetosPorStatus("ENTREGUE", pageIndex)
    }

    getProjetosInstalados(pageIndex: number) {
        return this.getProjetosPorStatus("INSTALADO", pageIndex)
    }

    getProjetosConcluidos(pageIndex: number) {
        return this.getProjetosPorStatus("ATIVADO", pageIndex)
    }

    getProjetosCancelados(pageIndex: number) {
        return this.getProjetosPorStatus("CANCELADO", pageIndex)
    }

    /**
     * 
     * @param status 
     * @param pageIndex se <=0 recuperar todos os registros 
     */
    getProjetosEmAndamento(pageIndex: number) {
        return this._genericGetProjetos("/api/projeto-cnme/p/andamento", pageIndex)
    }

    getProjetosAtrasadosPorEtapa(etapa: string, pageIndex: number) {
        return this._genericGetProjetos("/api/projeto-cnme/p/atrasados?etapa="+etapa, pageIndex)
    }

    getProjetosAtrasadosEmEnvio(pageIndex: number) {
        return this.getProjetosAtrasadosPorEtapa("ENVIO", pageIndex)
    }


    getProjetosAtrasadosEmInstalacao(pageIndex: number) {
        return this.getProjetosAtrasadosPorEtapa("INSTALACAO", pageIndex)
    }

    getProjetosAtrasadosEmAtivacao(pageIndex: number) {
        return this.getProjetosAtrasadosPorEtapa("ATIVACAO", pageIndex)
    }

    getProjetosPorEstado(uf: string, pageIndex: number) {
        return this._genericGetProjetos("/api/projeto-cnme/p/pesquisar?uf=" + uf, pageIndex)
    }
}