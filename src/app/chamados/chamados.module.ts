import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, MatTableModule } from '@angular/material';
import { MecRoutingModule } from '../mec/mec-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { ChamadosComponent } from './chamados.component';
import { ChamadosListComponent } from './chamados-list/chamados-list.component';
import { ChamadosRoutingModule } from './chamados-routing.module';

@NgModule({
  declarations: [ChamadosComponent, ChamadosListComponent],
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
    NgxMaskModule.forRoot()
]

})
export class ChamadosModule { }
