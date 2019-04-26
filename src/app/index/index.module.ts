import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { SharedModule } from '../_shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { IndexRoutingModule } from './index-routing.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { ProjetosModule } from '../projetos/projetos.module';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    SharedModule,
    IndexRoutingModule,
    DashboardModule,
    ProjetosModule
  ]
})
export class IndexModule { }
