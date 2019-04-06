
import { Component, OnInit } from '@angular/core';
import { DashboardDataService } from 'src/app/_shared/services/dashboard.service';

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
    public barChartLabels: string[] =
        ['Planejamento', 'Enviado', 'Entregue', 'Instalado', 'Ativado', 'Cancelado'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartData: any[] = [{}];

    constructor(
        private dashboardDataService: DashboardDataService
    ){}

    ngOnInit(){
        this.fetchStatus();
    }

    fetchStatus(){
        this.dashboardDataService.getProjetosStatus().subscribe((res:any[])=>{
            this.barChartData = [];
            let data:number[] =[];
            res.forEach(element => {
                data.push(element.status_count);
            });
            this.barChartData = [{data:data}];
        })
    }

    loadTempData(){
        this.barChartData = [{ data: [Math.floor((Math.random() * 100) + 1), Math.floor((Math.random() * 100) + 1), Math.floor((Math.random() * 100) + 1), Math.floor((Math.random() * 100) + 1), Math.floor((Math.random() * 100) + 1), Math.floor((Math.random() * 100) + 1), Math.floor((Math.random() * 100) + 1)] }];
        console.log("teste");
    }

    // events
    public chartClicked(e: any): void {
        console.log(e);
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
