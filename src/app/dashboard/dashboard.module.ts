import { NgModule } from '@angular/core';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../_shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { StatusChartComponent } from './status-chart/status-chart.component';
import { ChartsModule } from 'ng2-charts';
import { DashboardDataService } from '../_shared/services/dashboard.service';
import { EstadosStatusChartComponent } from './estados-status-chart/estados-status-chart.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { EstadosStatusComponent } from './estados-status/estados-status.component';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, MatTableModule, MatSortModule } from '@angular/material';
import {TimelineChartComponent } from './timeline-chart/timeline-chart.component';
import { EtapasAtrasadasComponent } from './etapas-atrasadas/etapas-atrasadas.component';
import { EnvioEmpresasComponent } from './empresas-status/empresas-status.component';
import { EmpresasEstadosComponent } from './empresas-estados/empresas-estados.component';

@NgModule({
    declarations: [DashboardComponent, StatusChartComponent, EstadosStatusChartComponent, EstadosStatusComponent, TimelineChartComponent, EtapasAtrasadasComponent, EnvioEmpresasComponent, EmpresasEstadosComponent],
    imports: [
        SharedModule,
        DashboardRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatSortModule,
        ChartsModule,
        NgCircleProgressModule.forRoot({
            radius: 60,
            space: -18,
            outerStrokeGradient: true,
            outerStrokeWidth: 18,
            innerStrokeWidth: 18,
            animateTitle: false,
            animationDuration: 1000,
            showSubtitle: false,
            showUnits: false,
            showBackground: false,
            clockwise: false,
            startFromZero: false,
            responsive:true,
            outerStrokeColor: "#546E7A",
            outerStrokeGradientStopColor: "#546E7A",
            innerStrokeColor: "#CFD8DC",
            titleFontSize:"50",
            titleFontWeight:"700"
        })
    ],
    exports: [DashboardComponent],
    providers:[DashboardDataService]
})
export class DashboardModule { }
