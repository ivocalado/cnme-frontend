import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DashboardDataService } from '../_shared/services/dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
    gestNaoConfirmados:number;
    projetosTotal:number;
    projetosConcluidos:number;
    projetosAndamento:number;
    projetosAtrasados:number;
    projetosEtapas: Array<any> = [{
        "instalacao_total": "1",
        "instalacao_total_andamento": "0",
        "instalacao_total_atrasada": "1",
        "instalacao_total_concluida": "0",
        "instalacao_total_concluida_atrasada": "0",
        "instalacao_percent_andamento": 0,
        "ativacao_total": "1",
        "ativacao_total_andamento": "0",
        "ativacao_total_atrasada": "1",
        "ativacao_total_concluida": "0",
        "ativacao_total_concluida_atrasada": "0",
        "ativacao_percent_andamento": 0,
        "envio_total": "1",
        "envio_total_andamento": "1",
        "envio_total_atrasada": "0",
        "envio_total_concluida": "0",
        "envio_total_concluida_atrasada": "0",
        "envio_percent_andamento": 0
    }]

    constructor(
        private dashboardDataService:DashboardDataService
    ) { }

    ngOnInit() {
        this.fetchProjetosExtrato();
        this.fetchGestoresNaoConfirmados();
    }

    fetchProjetosExtrato(){
        this.dashboardDataService.getProjetosExtrato().subscribe((res:any)=>{
            this.projetosTotal = res.total_projetos;
            this.projetosConcluidos = res.total_concluidos;
            this.projetosAndamento = res.total_andamento;
            this.projetosAtrasados = res.total_atrasados;
        })
    }

    fetchGestoresNaoConfirmados(){
        this.dashboardDataService.getGestoresNaoConfirmados().subscribe((res:number) =>{
            this.gestNaoConfirmados = res;
        })
    }

    loadTempData() {
        this.gestNaoConfirmados = Math.floor((Math.random() * 100) + 1);
        this.projetosTotal = Math.floor((Math.random() * 100) + 1);
        this.projetosConcluidos = Math.floor((Math.random() * 100) + 1);
        this.projetosAndamento = Math.floor((Math.random() * 100) + 1);
        this.projetosAtrasados = Math.floor((Math.random() * 100) + 1);
    }

}
