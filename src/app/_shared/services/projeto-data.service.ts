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

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof Error) {
            return throwError("client-side error");
        } else {
            return throwError(errorResponse.error.error);
        }

    }

    storeProjeto(projeto:Projeto):Observable<Projeto>{
        console.log(projeto);
        projeto.usuario_id = this.authService.getCurrentUser().id; //TODO: substituir para id do usuário logado
        projeto.status = StatusProjeto.CRIADO;
        return this.httpClient.post<Projeto>("/api/projeto-cnme", projeto, {
            headers: new HttpHeaders({
                "Content-Type": "application/json; charset=UTF-8"
            })
        }).pipe(map(data => data), catchError(this.handleError));
    }

    updateProjeto(id:number, projeto:Projeto){
        return this.httpClient.put('/api/projeto-cnme/'+id, projeto)
        .pipe(catchError(this.handleError));
    }

    getProjetos(){
        // verifica se o usuario logado é polo e retorna somente seus projetos
        let q = "";
        let usuarioAutenticado = this.authService.getCurrentUser();
        let classe = usuarioAutenticado.unidade.classe
        if(classe=="polo"){
            q = "/p/pesquisar?q=" + usuarioAutenticado.unidade.nome;
        }
        //

        return this.httpClient.get<Projeto[]>("/api/projeto-cnme"+q)
        .pipe(map(res =>{
            let projetos:Projeto[] = [];
            for (var key in res["data"]) {
                let projeto: Projeto;
                projeto = <Projeto>res["data"][key];
                projetos.push(projeto);
            }
            return projetos;
        }));
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
            .pipe(catchError(this.handleError));
    }

    storeKit(projetoId: number, kitId: number) {
        return this.httpClient.post("/api/projeto-cnme/" + projetoId + "/add-kit/" + kitId, null)
            .pipe(catchError(this.handleError));
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
        .pipe(catchError(this.handleError));
    }

    storeTarefaInstalacao(projetoId: number, tarefa: Tarefa) {
        return this.httpClient.post("api/etapas/projeto-cnme/" + projetoId + "/add-tarefa-instalacao", tarefa)
            .pipe(catchError(this.handleError));
    }

    storeTarefaAtivacao(projetoId: number, tarefa: Tarefa) {
        return this.httpClient.post("api/etapas/projeto-cnme/" + projetoId + "/add-tarefa-ativacao", tarefa)
            .pipe(catchError(this.handleError));
    }

    /*
    deprecated
    getTarefas(etapaId:number){
        return this.httpClient.get<Tarefa[]>("/api/etapas/" + etapaId + "/tarefas")
            .pipe(map(res => {
                let tarefas: Tarefa[] = [];
                for (var key in res["data"]) {
                    let tarefa: Tarefa;
                    tarefa = <Tarefa>res["data"][key];
                    tarefas.push(tarefa);
                }
                return tarefas;
            }));
    }*/

    deleteTarefa(tarefaId:number){
        return this.httpClient.delete("/api/tarefas/"+tarefaId)
        .pipe(catchError(this.handleError));
    }

    deleteEtapa(etapaId:number){
        return this.httpClient.delete("/api/etapas/"+etapaId)
        .pipe(catchError(this.handleError));
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
            .pipe(catchError(this.handleError));
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
            .pipe(catchError(this.handleError));
    }

    getProjetosAtrasados() {
        return this.httpClient.get<Projeto[]>("/api/projeto-cnme/p/atrasados")
        .pipe(map(res =>{
            let projetos:Projeto[] = [];
            for (var key in res["data"]) {
                let projeto: Projeto;
                projeto = <Projeto>res["data"][key];
                projetos.push(projeto);
            }
            return projetos;
        }));
    }

    getProjetosPorStatus(status: string) {
        return this.httpClient.get<Projeto[]>("/api/projeto-cnme/p/pesquisar?status="+status)
        .pipe(map(res =>{
            let projetos:Projeto[] = [];
            for (var key in res["data"]) {
                let projeto: Projeto;
                projeto = <Projeto>res["data"][key];
                projetos.push(projeto);
            }
            return projetos;
        }));
    }

    getProjetosEmPlanejamento() {
        return this.getProjetosPorStatus("PLANEJAMENTO")
    }

    getProjetosEnviados() {
        return this.getProjetosPorStatus("ENVIADO")
    }

    getProjetosEntregues() {
        return this.getProjetosPorStatus("ENTREGUE")
    }

    getProjetosInstalados() {
        return this.getProjetosPorStatus("INSTALADO")
    }

    getProjetosConcluidos() {
        return this.getProjetosPorStatus("ATIVADO")
    }

    getProjetosCancelados() {
        return this.getProjetosPorStatus("CANCELADO")
    }

    getProjetosEmAndamento() {
        return this.httpClient.get<Projeto[]>("/api/projeto-cnme/p/andamento")
        .pipe(map(res =>{
            let projetos:Projeto[] = [];
            for (var key in res["data"]) {
                let projeto: Projeto;
                projeto = <Projeto>res["data"][key];
                projetos.push(projeto);
            }
            return projetos;
        }));
    }

    getProjetosAtrasadosPorEtapa(etapa: string) {
        return this.httpClient.get<Projeto[]>("/api/projeto-cnme/p/atrasados?etapa="+etapa)
        .pipe(map(res =>{
            let projetos:Projeto[] = [];
            for (var key in res["data"]) {
                let projeto: Projeto;
                projeto = <Projeto>res["data"][key];
                projetos.push(projeto);
            }
            console.log(projetos)
            return projetos;
        }));
    }

    getProjetosAtrasadosEmEnvio() {
        return this.getProjetosAtrasadosPorEtapa("ENVIO")
    }


    getProjetosAtrasadosEmInstalacao() {
        console.log("getProjetosAtrasadosEmInstalacao")
        return this.getProjetosAtrasadosPorEtapa("INSTALACAO")
    }

    getProjetosAtrasadosEmAtivacao() {
        return this.getProjetosAtrasadosPorEtapa("ATIVACAO")
    }
}