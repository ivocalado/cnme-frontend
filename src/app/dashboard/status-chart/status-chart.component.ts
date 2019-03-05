
import { Component, OnInit } from '@angular/core';
import { DashboardDataService } from 'src/app/_shared/services/dashboard.service';

@Component({
  selector: 'app-status-chart',
  templateUrl: './status-chart.component.html',
  styleUrls: ['./status-chart.component.scss']
})
export class StatusChartComponent {
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        legend: {
            display: false
        }
    };
    public barChartLabels: string[] =
        ['PLANEJAMENTO', 'CRIADO', 'ENVIADO', 'ENTREGUE', 'INSTALADO', 'FINALIZADO', 'CANCELADO'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartData: any[] = [
        { data: [28, 48, 40, 19, 50, 27, 20], label: 'Status' }
    ];

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
