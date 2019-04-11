import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { DashboardDataService } from 'src/app/_shared/services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: "app-envio-empresas",
    templateUrl: "./envio-empresas.component.html",
    styleUrls: ["./envio-empresas.component.scss"]
})
export class EnvioEmpresasComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ["empresa","total","total_andamento","total_vence_hoje","total_atrasada","total_concluida","total_concluida_atrasada"];
    dataSource;

    constructor(
        private dashboardDataService: DashboardDataService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.fetchEmpresas();
    }

    fetchEmpresas() {
        this.dashboardDataService.getEmpresasEnvio().subscribe((res: any[]) => {
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.sort = this.sort;
        });
    }

    applyFilter(filterValue: string) {
        console.log(filterValue);
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
