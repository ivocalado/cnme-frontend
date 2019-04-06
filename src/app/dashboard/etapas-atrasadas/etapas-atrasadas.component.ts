import { Component, OnInit } from '@angular/core';
import { DashboardDataService } from 'src/app/_shared/services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: "app-etapas-atrasadas",
    templateUrl: "./etapas-atrasadas.component.html",
    styleUrls: ["./etapas-atrasadas.component.scss"]
})
export class EtapasAtrasadasComponent implements OnInit {
    // projetosTotal: number = 0;
    // projetosConcluidos: number = 0;
    // projetosAndamento: number = 0;
    // projetosAtrasados: number = 0;
    projetosEtapas: any = {};
    qtdEtapasAtrasadas: number = 0;

    constructor(
        private dashboardDataService: DashboardDataService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.loadTempData();
        this.fetchEtapas();
        this.projetosEtapas.instalacao_total_atrasada = 0
        this.projetosEtapas.ativacao_total_atrasada = 0
        this.projetosEtapas.envio_total_atrasada = 0
    }

    fetchEtapas() {
        this.dashboardDataService.getEtapasExtrato().subscribe((res: any) => {
            this.projetosEtapas = res;
            this.calcEtapas();
        });
    }

    calcEtapas() {
        if(!Array.isArray(this.projetosEtapas)) {
            this.qtdEtapasAtrasadas = (+this.projetosEtapas.instalacao_total_atrasada) +
            (+this.projetosEtapas.ativacao_total_atrasada) +
            (+this.projetosEtapas.envio_total_atrasada)
        } else 
            this.qtdEtapasAtrasadas = 0

        this.projetosEtapas.pctInstalacao = this.getPercent(
            this.projetosEtapas.instalacao_total_atrasada,
            this.qtdEtapasAtrasadas
        );

        this.projetosEtapas.pctAtivacao = this.getPercent(
            this.projetosEtapas.ativacao_total_atrasada,
            this.qtdEtapasAtrasadas
        );

        this.projetosEtapas.pctEnvio = this.getPercent(
            this.projetosEtapas.envio_total_atrasada,
            this.qtdEtapasAtrasadas
        );
        
            
    }

    getPercent(value, total) {
        if (total > 0) {
            let percent = (value * 100) / total;
            return percent.toFixed(1);
        }
        return 0;
    }

    public loadTempData(): void {
        this.projetosEtapas = {
            instalacao_total: 5,
            instalacao_total_andamento: 0,
            instalacao_total_atrasada: 7,
            instalacao_total_concluida: 0,
            instalacao_total_concluida_atrasada: 0,
            instalacao_percent_andamento: 0,
            ativacao_total: 10,
            ativacao_total_andamento: 0,
            ativacao_total_atrasada: 3,
            ativacao_total_concluida: 0,
            ativacao_total_concluida_atrasada: 0,
            ativacao_percent_andamento: 0,
            envio_total: 8,
            envio_total_andamento: 1,
            envio_total_atrasada: 4,
            envio_total_concluida: 0,
            envio_total_concluida_atrasada: 0,
            envio_percent_andamento: 0
        }
        this.calcEtapas();

    }

    showProjetosAtrasadosEmEnvio() {
        console.log("showProjetosAtrasadosEmEnvio")
        this.router.navigate(["/projetos/atrasados/envio"], { relativeTo: this.route });
    }

    showProjetosAtrasadosEmInstalacao() {
        console.log("showProjetosAtrasadosEmInstalacao")
        this.router.navigate(["/projetos/atrasados/instalacao"], { relativeTo: this.route });
    }

    showProjetosAtrasadosEmAtivacao() {
        console.log("showProjetosAtrasadosEmAtivacao")
        this.router.navigate(["/projetos/atrasados/ativacao"], { relativeTo: this.route });
    }
}
