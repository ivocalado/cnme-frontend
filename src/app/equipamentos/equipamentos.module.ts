import { NgModule } from "@angular/core";
import { EquipamentosComponent } from "./equipamentos.component";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import {
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule, MatPaginatorModule 
} from "@angular/material";
import { NgxMaskModule } from "ngx-mask";

import { SharedModule } from "../_shared/shared.module";
import { EquipamentoListComponent } from './equipamento-list/equipamento-list.component';
import { EquipamentoEditComponent } from './equipamento-edit/equipamento-edit.component';
import { EquipamentoDetailsComponent } from './equipamento-details/equipamento-details.component';
import { EquipamentosRoutingModule } from './equipamentos-routing.module';


@NgModule({
    declarations: [EquipamentosComponent, EquipamentoListComponent, EquipamentoEditComponent, EquipamentoDetailsComponent],
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
        EquipamentosRoutingModule,
        MatPaginatorModule, 
        NgxMaskModule.forRoot()
    ]
})
export class EquipamentosModule {}
