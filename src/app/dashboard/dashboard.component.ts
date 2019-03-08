import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DashboardDataService } from '../_shared/services/dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
    gestNaoConfirmados:number;

    constructor(
        private dashboardDataService:DashboardDataService
    ) { }

    ngOnInit() {
        this.fetchGestoresNaoConfirmados();
    }

    fetchGestoresNaoConfirmados(){
        this.dashboardDataService.getGestoresNaoConfirmados().subscribe((res:number) =>{
            this.gestNaoConfirmados = res;
            console.log(this.gestNaoConfirmados);
        })
    }

    loadTempData() {
        this.gestNaoConfirmados = Math.floor((Math.random() * 100) + 1);
    }

}
