import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-estados-status-chart',
    templateUrl: './estados-status-chart.component.html',
    styleUrls: ['./estados-status-chart.component.scss']
})
export class EstadosStatusChartComponent implements OnInit {

    public lineChartData: any = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'AC', hidden: false},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'AL', hidden: null},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'AP', hidden: true},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'AM', hidden: true},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'BA', hidden: true},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'CE', hidden: true},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'DF', hidden: true},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'ES', hidden: true},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'GO', hidden: true},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'MA', hidden: true},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'MT', hidden: true},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'MS', hidden: true},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'MG', hidden: true},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'PA', hidden: true},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'PB', hidden: true},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'PR', hidden: true},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'PE', hidden: true},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'PI', hidden: true},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'RJ', hidden: true},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'RN', hidden: true},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'RS', hidden: true},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'RO', hidden: true},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'RR', hidden: true},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'SC', hidden: true},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'SP', hidden: true},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'SE', hidden: true},
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'TO', hidden: true}
    ];
    public lineChartLabels: Array<any> = ['CRIADO', 'PLANEJAMENTO', 'ENVIADO', 'ENTREGUE', 'INSTALADO', 'FINALIZADO', 'CANCELADO'];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';


    constructor() { }

    ngOnInit() {
        this.randomize();
    }

    public randomize(): void {
        let _lineChartData: Array<any> = new Array(this.lineChartData.length);
        for (let i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label, hidden:true};
            for (let j = 0; j < this.lineChartData[i].data.length; j++) {
                _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
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
