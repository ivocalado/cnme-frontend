import { NgModule } from '@angular/core';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../_shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { StatusChartComponent } from './status-chart/status-chart.component';
import { ChartsModule } from 'ng2-charts';
import { DashboardDataService } from '../_shared/services/dashboard.service';
import { EstadosStatusChartComponent } from './estados-status-chart/estados-status-chart.component';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
    declarations: [DashboardComponent, StatusChartComponent, EstadosStatusChartComponent],
    imports: [
        SharedModule,
        DashboardRoutingModule,
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
    providers:[DashboardDataService]
})
export class DashboardModule { }
