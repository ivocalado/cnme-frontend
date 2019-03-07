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
        projeto.usuario_id = this.authService.getCurrentUser().id; //TODO: substituir para id do usuário logado
        projeto.status = StatusProjeto.CRIADO;
        return this.httpClient.post<Projeto>("/api/projeto-cnme", projeto, {
            headers: new HttpHeaders({
                "Content-Type": "application/json; charset=UTF-8",
                "Authorization": 'Bearer '+this.authService.getToken()
            })
        }).pipe(map(data => data), catchError(this.handleError));
    }

    updateProjeto(id:number, projeto:Projeto){
        return this.httpClient.put('/api/projeto-cnme/'+id, projeto, {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+this.authService.getToken()
            })
        })
        .pipe(catchError(this.handleError));
    }

    getProjetos(){
        return this.httpClient.get<Projeto[]>("/api/projeto-cnme", {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+this.authService.getToken()
            })
        })
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
        return this.httpClient.get<Projeto>("/api/projeto-cnme/"+id, {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+this.authService.getToken()
            })
        })
        .pipe(map(res=>{
            let projeto:Projeto;
            projeto = res["data"];
            return projeto;
        }));
    }

    deleteProjeto(id: number) {
        return this.httpClient.delete("/api/projeto-cnme/" + id, {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+this.authService.getToken()
            })
        });
    }

    storeEquipamentos(projetoId: number, equipamentosIds: number[]) {
        return this.httpClient.post("/api/projeto-cnme/" + projetoId + "/add-equipamentos", equipamentosIds, {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+this.authService.getToken()
            })
        })
            .pipe(catchError(this.handleError));
    }

    storeKit(projetoId: number, kitId: number) {
        return this.httpClient.post("/api/projeto-cnme/" + projetoId + "/add-kit/" + kitId, null, {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+this.authService.getToken()
            })
        })
            .pipe(catchError(this.handleError));
    }
    deleteKit(projetoId: number, kitId: number) {
        return this.httpClient.delete("api/projeto-cnme/" + projetoId + "/remove-kit/" + kitId, {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+this.authService.getToken()
            })
        });
    }

    getEtapasProjeto(projetoId: number) {
        return this.httpClient.get<Etapa[]>("/api/projeto-cnme/" + projetoId + "/etapas", {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+this.authService.getToken()
            })
        })
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
        return this.httpClient.get<Etapa>("/api/projeto-cnme/" + projetoId + "/etapa-envio", {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+this.authService.getToken()
            })
        })
            .pipe(map(res => {
                let etapa: Etapa;
                etapa = res["data"];
                return etapa;
            }))
    }

    getEtapaInstalacao(projetoId: number) {
        return this.httpClient.get<Etapa[]>("api/projeto-cnme/"+projetoId+"/etapa-instalacao", {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+this.authService.getToken()
            })
        })
            .pipe(map(res => {
                let etapa: Etapa;
                etapa = res["data"];
                return etapa;
        }));
    }

    getEtapaAtivacao(projetoId: number) {
        return this.httpClient.get<Etapa[]>("/api/projeto-cnme/" + projetoId + "/etapa-ativacao", {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+this.authService.getToken()
            })
        })
            .pipe(map(res => {
                let etapa: Etapa;
                etapa = res["data"];
                return etapa;
        }));
    }

    storeTarefaEnvio(projetoId:number, tarefa:Tarefa){
        return this.httpClient.post("api/etapas/projeto-cnme/"+projetoId+"/add-tarefa-envio", tarefa, {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+this.authService.getToken()
            })
        })
        .pipe(catchError(this.handleError));
    }

    storeTarefaInstalacao(projetoId: number, tarefa: Tarefa) {
        return this.httpClient.post("api/etapas/projeto-cnme/" + projetoId + "/add-tarefa-instalacao", tarefa, {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+this.authService.getToken()
            })
        })
            .pipe(catchError(this.handleError));
    }

    storeTarefaAtivacao(projetoId: number, tarefa: Tarefa) {
        return this.httpClient.post("api/etapas/projeto-cnme/" + projetoId + "/add-tarefa-ativacao", tarefa, {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+this.authService.getToken()
            })
        })
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

    deleteTarefa(etapaId: number, tarefaId:number){
        return this.httpClient.delete("/api/etapas/"+etapaId+"/remove-tarefa/"+tarefaId, {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+this.authService.getToken()
            })
        })
        .pipe(catchError(this.handleError));
    }

    getEquipDisponiveisEnvio(projetoId:number){
        return this.httpClient.get<EquipamentoProjeto>("api/tarefas/projeto-cnme/" +projetoId+"/equipamentos-disponiveis-envio", {
            headers: new HttpHeaders({
                "Authorization": 'Bearer '+this.authService.getToken()
            })
        })
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