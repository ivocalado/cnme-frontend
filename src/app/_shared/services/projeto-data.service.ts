import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projeto } from '../models/projeto.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { StatusProjeto } from '../helpers/enum-helper';
import { Tarefa } from '../models/tarefa.model';
import { Etapa } from '../models/etapa.model';
import { EquipamentoProjeto } from '../models/equipamentoProjeto.model';

@Injectable()
export class ProjetoDataService{

    constructor(private httpClient:HttpClient){}

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof Error) {
            return throwError("client-side error");
        } else {
            return throwError(errorResponse.error.messages);
        }

    }

    storeProjeto(projeto:Projeto):Observable<Projeto>{
        projeto.usuario_id = 1; //TODO: substituir para id do usuário logado
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
        return this.httpClient.get<Projeto[]>("/api/projeto-cnme")
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
        return this.httpClient.get<Etapa[]>("/api/projeto-cnme/" + projetoId + "/etapas")
            .pipe(map(res => {
                for (var key in res["data"]) {
                    let etapa = <Etapa>res["data"][key];
                    if(etapa.tipo == "INSTALACAO")
                        return etapa
                }
        }));
    }

    getEtapaAtivacao(projetoId: number) {
        return this.httpClient.get<Etapa[]>("/api/projeto-cnme/" + projetoId + "/etapas")
            .pipe(map(res => {
                for (var key in res["data"]) {
                    let etapa = <Etapa>res["data"][key];
                    if(etapa.tipo == "ATIVACAO")
                        return etapa
                }
        }));
    }

    storeTarefa(projetoId:number, tarefaEnvio:Tarefa){
        return this.httpClient.post("api/etapas/projeto-cnme/"+projetoId+"/add-tarefa-envio", tarefaEnvio)
        .pipe(catchError(this.handleError));
    }

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
    }

    deleteTarefa(etapaId: number, tarefaId:number){
        return this.httpClient.delete("/api/etapas/"+etapaId+"/remove-tarefa/"+tarefaId)
        .pipe(catchError(this.handleError));
    }

    getEquipDisponiveisEnvio(projetoId:number){
        return this.httpClient.get<EquipamentoProjeto>("api/tarefas/projeto-cnme/" +projetoId+"/equipamentos-disponiveis-envio")
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


}