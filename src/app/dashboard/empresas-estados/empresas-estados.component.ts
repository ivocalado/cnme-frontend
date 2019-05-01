import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort, MatTableDataSource } from "@angular/material";
import { DashboardDataService } from "src/app/_shared/services/dashboard.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UnidadeDataService } from 'src/app/_shared/services/unidade-data.service';
import { Unidade } from 'src/app/_shared/models/unidade.model';

export interface SelectOptions {
    value: string;
    viewValue: string;
}

@Component({
    selector: "app-empresas-estados",
    templateUrl: "./empresas-estados.component.html",
    styleUrls: ["./empresas-estados.component.scss"]
})
export class EmpresasEstadosComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = [
        "empresa",
        "total",
        "total_andamento",
        "total_vence_hoje",
        "total_atrasada",
        "total_concluida",
        "total_concluida_atrasada"
    ];
    dataSource;

    selectOptions: SelectOptions[] = [
        { value: "envio", viewValue: "Envio" },
        { value: "instalacao", viewValue: "Instalação" },
        { value: "ativacao", viewValue: "Ativação" }
    ];
    empresas: Unidade[];

    statusSelected: string = "envio";
    empresaSelected: number;

    constructor(
        private dashboardDataService: DashboardDataService,
        private unidadeDataService: UnidadeDataService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.fetchEmpresas();
    }

    fetchEmpresas() {
        this.unidadeDataService.getAllEmpresas().subscribe((res: any) => {
            this.empresas = res.unidades;
            console.log(this.empresas);
            this.fetchRelatorio(this.empresas[0].id);
        });
    }

    fetchRelatorio(empresaId: number) {
        this.empresaSelected = empresaId;
        this.dashboardDataService
            .getRelProjetosFrom(this.statusSelected, this.empresaSelected)
            .subscribe((res: any[]) => {
                this.dataSource = new MatTableDataSource(res);
                this.dataSource.sort = this.sort;
            });
    }

    applyFilter(filterValue: string) {
        console.log(filterValue);
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    onChangeStatus(e) {
        this.statusSelected = e;
        this.dashboardDataService
            .getRelProjetosFrom(this.statusSelected, this.empresaSelected)
            .subscribe((res: any[]) => {
                this.dataSource = new MatTableDataSource(res);
                this.dataSource.sort = this.sort;
                console.log(res);
            });
    }

    onChangeEmpresa(e) {
        this.empresaSelected = e;
        this.dashboardDataService
            .getRelProjetosFrom(this.statusSelected, this.empresaSelected)
            .subscribe((res: any[]) => {
                this.dataSource = new MatTableDataSource(res);
                this.dataSource.sort = this.sort;
                console.log(res);
            });
    }
}
