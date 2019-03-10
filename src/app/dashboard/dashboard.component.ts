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
    projetosAtrasados:number

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
