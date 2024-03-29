import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DashboardDataService } from '../_shared/services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
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

    gestoresExtrato: any = {
        confirmados: 0,
        nao_confirmados: 0
    }

    gestoresEmAtrasoPct: any = 0

    constructor(
        private dashboardDataService:DashboardDataService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.fetchProjetosExtrato();
        this.fetchGestoresExtrato()
    }

    fetchProjetosExtrato(){
        this.dashboardDataService.getProjetosExtrato().subscribe((res:any)=>{
            this.projetosTotal = res.total_projetos;
            this.projetosConcluidos = res.total_concluidos;
            this.projetosAndamento = res.total_andamento;
            this.projetosAtrasados = res.total_atrasados;
        })
    }

    fetchGestoresExtrato(){
        this.dashboardDataService.getGestoresExtrato().subscribe(
            extrato => {
                this.gestoresExtrato = extrato
                this.gestoresEmAtrasoPct =
                    this.getPercent((+this.gestoresExtrato.nao_confirmados), (+this.gestoresExtrato.nao_confirmados) + (+this.gestoresExtrato.confirmados))
            }
        )
    }

    showGestoresNaoConfirmados() {
        this.router.navigate(["/usuarios/gestores-nao-confirmados"], { relativeTo: this.route });
    }

    loadTempData() {
        this.projetosTotal = Math.floor((Math.random() * 100) + 1);
        this.projetosConcluidos = Math.floor((Math.random() * 100) + 1);
        this.projetosAndamento = Math.floor((Math.random() * 100) + 1);
        this.projetosAtrasados = Math.floor((Math.random() * 100) + 1);
    }

    showProjetosAtrasados() {
        this.router.navigate(["/projetos/atrasados"], { relativeTo: this.route });
    }

    showProjetosConcluidos() {
        this.router.navigate(["/projetos/concluidos"], { relativeTo: this.route });
    }

    showProjetosEmAndamento() {
        this.router.navigate(["/projetos/andamento"], { relativeTo: this.route });
    }

    showProjetos() {
        this.router.navigate(["/projetos"], { relativeTo: this.route });
    }

    getPercent(value, total) {
        if (total > 0) {
            let percent = (value * 100) / total;
            return percent.toFixed(1);
        }
        return 0;
    }
}
