
import { Component, OnInit } from '@angular/core';
import { DashboardDataService } from 'src/app/_shared/services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-status-chart',
  templateUrl: './status-chart.component.html',
  styleUrls: ['./status-chart.component.scss']
})
export class StatusChartComponent implements OnInit {
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        legend: {
            display: false
        }
    };
    requestFields: string[] = 
        ['PLANEJAMENTO', 'ENVIADO', 'ENTREGUE', 'INSTALADO', 'ATIVADO', 'CANCELADO']

    public barChartLabels: string[] =
        ['Planejamento', 'Enviado', 'Entregue', 'Instalado', 'Ativado', 'Cancelado'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartData: any[] = [{}];

    constructor(
        private dashboardDataService: DashboardDataService,
        private route:ActivatedRoute,
        private router:Router
    ){}

    ngOnInit(){
        this.fetchStatus();
    }

    fetchStatus(){
        this.dashboardDataService.getProjetosStatus().subscribe((res:any[])=>{
            this.barChartData = [];
            let data:number[] =[];
            
            let result = {}
            res.forEach(element => {
                result[element.status] = element
            });

            for(let v of this.requestFields) {
                data.push(result[v].status_count)
            }
            this.barChartData = [{data:data}];
        })
    }

    loadTempData(){
        this.barChartData = [{ data: [Math.floor((Math.random() * 100) + 1), Math.floor((Math.random() * 100) + 1), Math.floor((Math.random() * 100) + 1), Math.floor((Math.random() * 100) + 1), Math.floor((Math.random() * 100) + 1), Math.floor((Math.random() * 100) + 1), Math.floor((Math.random() * 100) + 1)] }];
        console.log("teste");
    }

    // events
    public chartClicked(e: any): void {
        if(e.active[0]) {
            let urls: string[] = ["planejamento", "enviados", "entregues", "instalados", "ativados", "cancelados"]
            let resource = urls[e.active[0]._index]
            this.router.navigate(["/projetos/"+resource], { relativeTo: this.route });
        }
    }

    public chartHovered(e: any): void {
        console.log(e);
    }


    public colors: Array<any> = [
        {
            //backgroundColor: ["#B2EBF2", "#80DEEA", "#4DD0E1", "#26C6DA", "#00BCD4", "#00ACC1", "#0097A7"],
            backgroundColor: "#607d8b",
            hoverBackgroundColor: "#37474f",
        }
    ];

}
