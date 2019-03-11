import { Component, OnInit } from '@angular/core';
import { DashboardDataService } from 'src/app/_shared/services/dashboard.service';

@Component({
  selector: 'app-timeline-chart',
  templateUrl: './timeline-chart.component.html',
  styleUrls: ['./timeline-chart.component.scss']
})
export class TimelineChartComponent implements OnInit {

    public lineChartData: any = [
        { data: [], label: "Iniciados" },
        { data: [], label: "Concluídos" }
    ];
    public lineChartLabels: Array<any> = [];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        {
            // grey
            backgroundColor: "rgba(148,159,177,0.2)",
            borderColor: "rgba(148,159,177,1)",
            pointBackgroundColor: "rgba(148,159,177,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(148,159,177,0.8)"
        },
        {
            // dark grey
            backgroundColor: "rgba(77,83,96,0.2)",
            borderColor: "rgba(77,83,96,1)",
            pointBackgroundColor: "rgba(77,83,96,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(77,83,96,1)"
        },
        {
            // grey
            backgroundColor: "rgba(148,159,177,0.2)",
            borderColor: "rgba(148,159,177,1)",
            pointBackgroundColor: "rgba(148,159,177,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(148,159,177,0.8)"
        }
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = "line";

    constructor(
        private dashBoardDataService:DashboardDataService
    ) { }

    ngOnInit() {
        this.fetchTimeline();
    }

    fetchTimeline(){
        this.dashBoardDataService.getProjetosTimeLine().subscribe((res: any[]) => {
            this.lineChartLabels = [];
            this.lineChartData[0].data = [];
            this.lineChartData[1].data = [];
            res.forEach(element => {
                this.lineChartLabels.push(element.mes_ano);
                this.lineChartData[0].data.push(element.iniciados);
                this.lineChartData[1].data.push(element.concluidos);
            });
        })
    }

    public loadTempData(): void {
        let _lineChartData: Array<any> = new Array(this.lineChartData.length);
        for (let i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = {
                data: new Array(this.lineChartData[i].data.length),
                label: this.lineChartData[i].label
                //hidden: true
            };
            for (let j = 0; j < this.lineChartData[i].data.length; j++) {
                _lineChartData[i].data[j] = Math.floor(Math.random() * 100 + 1);
            }
        }
        _lineChartData[0].hidden = false;
        this.lineChartData = _lineChartData;
    }

    // events
    public chartClicked(e: any): void {
        console.log(e.event);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

}
