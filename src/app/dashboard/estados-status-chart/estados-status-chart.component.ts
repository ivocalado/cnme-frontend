import { Component, OnInit } from '@angular/core';

@Component({
    selector: "app-estados-status-chart",
    templateUrl: "./estados-status-chart.component.html",
    styleUrls: ["./estados-status-chart.component.scss"]
})
export class EstadosStatusChartComponent implements OnInit {
    public lineChartData: any = [
        { data: [3, 8, 5, 1, 3], label: "Iniciados" },
        { data: [1, 9, 3, 8, 2], label: "Concluidos" }
    ];
    public lineChartLabels: Array<any> = ["04/2018", "05/2018", "06/2018", "07/2018", "08/2018"];
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

    constructor() {}

    ngOnInit() {
        //this.randomize();
    }

    public randomize(): void {
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
