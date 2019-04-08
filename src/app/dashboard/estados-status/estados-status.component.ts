import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { DashboardDataService } from 'src/app/_shared/services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-estados-status',
    templateUrl: './estados-status.component.html',
    styleUrls: ['./estados-status.component.scss']
})
export class EstadosStatusComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ["estado", "total_planejamento", "total_enviado", "total_entregue", "total_instalado", "total_cancelado","total"];
    dataSource;

    constructor(
        private dashboardDataService:DashboardDataService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.fetchEstados();
    }

    fetchEstados(){
        this.dashboardDataService.getEstadosStatus().subscribe((res:any[])=>{
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.sort = this.sort;
        })
    }

    applyFilter(filterValue: string) {
        console.log(filterValue);
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    loadTempData(){
        let data: any[] = [
            {
                "estado": "Acre",
                "uf": "AC",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "Alagoas",
                "uf": "AL",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "Amazonas",
                "uf": "AM",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "Amapá",
                "uf": "AP",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "Bahia",
                "uf": "BA",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "Ceará",
                "uf": "CE",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "Distrito Federal",
                "uf": "DF",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "Espírito Santo",
                "uf": "ES",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "Goiás",
                "uf": "GO",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "Maranhão",
                "uf": "MA",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "Minas Gerais",
                "uf": "MG",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "Mato Grosso do Sul",
                "uf": "MS",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "Mato Grosso",
                "uf": "MT",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "Pará",
                "uf": "PA",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "Paraíba",
                "uf": "PB",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "Pernambuco",
                "uf": "PE",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "Piauí",
                "uf": "PI",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "Paraná",
                "uf": "PR",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "Rio de Janeiro",
                "uf": "RJ",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "Rio Grande do Norte",
                "uf": "RN",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "Rondônia",
                "uf": "RO",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "Roraima",
                "uf": "RR",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "Rio Grande do Sul",
                "uf": "RS",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "Santa Catarina",
                "uf": "SC",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "Sergipe",
                "uf": "SE",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "São Paulo",
                "uf": "SP",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            },
            {
                "estado": "Tocantins",
                "uf": "TO",
                "total": Math.floor((Math.random() * 100) + 1),
                "total_criado": Math.floor((Math.random() * 100) + 1),
                "total_planejamento": Math.floor((Math.random() * 100) + 1),
                "total_enviado": Math.floor((Math.random() * 100) + 1),
                "total_entregue": Math.floor((Math.random() * 100) + 1),
                "total_instalado": Math.floor((Math.random() * 100) + 1),
                "total_finalizado": Math.floor((Math.random() * 100) + 1),
                "total_cancelado": Math.floor((Math.random() * 100) + 1),
                "percent": 0
            }
        ]
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
    }

    showProjetosPorEstados(row: any) {
        let estado = row.uf 
        this.router.navigate(["/projetos/por-estado/", estado], { relativeTo: this.route });
    }
}
