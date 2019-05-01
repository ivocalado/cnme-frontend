import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class DashboardDataService {
    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) {}

    getProjetosExtrato() {
        return this.httpClient.get("api/dashboard/projetos/extrato");
    }

    getProjetosStatus() {
        return this.httpClient.get("api/dashboard/projetos/status");
    }

    getEstadosStatus() {
        return this.httpClient.get("api/dashboard/projetos/estado/status");
    }

    getGestoresExtrato() {
        return this.httpClient.get("/api/dashboard/usuarios/gestores/extrato");
    }

    getProjetosTimeLine() {
        return this.httpClient.get("/api/dashboard/projetos/meses");
    }

    getEtapasExtrato() {
        return this.httpClient.get("/api/dashboard/projetos/etapas/extrato");
    }

    /*getEmpresasEnvio() {
        return this.httpClient.get("/api/dashboard/projetos/envio/empresas");
    }
    getEmpresasInstalacao() {
        return this.httpClient.get("/api/dashboard/projetos/instalacao/empresas");
    }
    getEmpresasAtivacao() {
        return this.httpClient.get("/api/dashboard/projetos/instalacao/empresas");
    }*/

    getEmpresasFromStatus(status:string){
        return this.httpClient.get("/api/dashboard/projetos/"+status+"/empresas");
    }

    getRelProjetosFrom(status:string, empresaId:number){
        return this.httpClient.get("/api/dashboard/projetos/"+status+"/empresas/"+empresaId+"/estados");
    }
}