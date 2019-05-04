import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, MatTableModule, MatPaginatorModule, MatExpansionModule } from '@angular/material';
import { MecRoutingModule } from '../mec/mec-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { ChamadosComponent } from './chamados.component';
import { ChamadosListComponent } from './chamados-list/chamados-list.component';
import { ChamadosRoutingModule } from './chamados-routing.module';
import { ChamadoDataService } from '../_shared/services/chamado-data.service';
import { ChamadoDetailsComponent } from './chamado-details/chamado-details.component';
import { UnidadeDataService } from '../_shared/services/unidade-data.service';

@NgModule({
  declarations: [ChamadosComponent, ChamadosListComponent, ChamadoDetailsComponent],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    ChamadosRoutingModule,
    MatPaginatorModule,
    MatExpansionModule,
    NgxMaskModule.forRoot()
],
providers: [ChamadoDataService, UnidadeDataService]

})
export class ChamadosModule { }
