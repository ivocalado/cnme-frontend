import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { DashboardDataService } from 'src/app/_shared/services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';

export interface SelectOptions {
    value: string;
    viewValue: string;
}

@Component({
    selector: "app-empresas-status",
    templateUrl: "./empresas-status.component.html",
    styleUrls: ["./empresas-status.component.scss"]
})
export class EnvioEmpresasComponent implements OnInit {
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

    constructor(
        private dashboardDataService: DashboardDataService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.fetchEmpresas();
    }

    fetchEmpresas() {
        this.dashboardDataService
            .getEmpresasFromStatus('envio')
            .subscribe((res: any[]) => {
                this.dataSource = new MatTableDataSource(res);
                this.dataSource.sort = this.sort;
            });
    }

    applyFilter(filterValue: string) {
        console.log(filterValue);
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    onChange(e){
        console.log(e);
        this.dashboardDataService.getEmpresasFromStatus(e).subscribe((res:any[])=>{
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.sort = this.sort;
        })
    }
}
