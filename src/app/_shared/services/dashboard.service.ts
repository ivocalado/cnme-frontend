import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class DashboardDataService{

    constructor(private httpClient:HttpClient, private authService:AuthService){}

    getProjetosExtrato(){
        return this.httpClient.get("api/dashboard/projetos/extrato", {
            headers: new HttpHeaders({ "Authorization": 'Bearer ' + this.authService.getToken() })
        })
    }

    getProjetosStatus(){
        return this.httpClient.get("api/dashboard/projetos/status", {
            headers: new HttpHeaders({"Authorization": 'Bearer ' + this.authService.getToken()})
        })
    }

    getEstadosStatus(){
        return this.httpClient.get("api/dashboard/projetos/estado/status",{
            headers: new HttpHeaders({ "Authorization": 'Bearer ' + this.authService.getToken() })
        })
    }

    getGestoresNaoConfirmados(){
        return this.httpClient.get("api/dashboard/usuarios/gestores/nao-confirmados/total",{
            headers: new HttpHeaders({ "Authorization": 'Bearer ' + this.authService.getToken() })
        })
    }

    getProjetosTimeLine(){
        return this.httpClient.get("/api/dashboard/projetos/meses", {
            headers: new HttpHeaders({ "Authorization": 'Bearer ' + this.authService.getToken() })
        })
    }

    getEtapasExtrato(){
        return this.httpClient.get("/api/dashboard/projetos/etapas/extrato", {
            headers: new HttpHeaders({ "Authorization": 'Bearer ' + this.authService.getToken() })
        })
    }
}