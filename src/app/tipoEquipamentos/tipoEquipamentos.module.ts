import { NgModule } from "@angular/core";
import { TipoEquipamentosComponent } from "./tipoEquipamentos.component";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import {
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule
} from "@angular/material";
import { NgxMaskModule } from "ngx-mask";

import { SharedModule } from "../_shared/shared.module";
import { TipoEquipamentoListComponent } from './tipoEquipamento-list/tipoEquipamento-list.component';
import { TipoEquipamentoEditComponent } from './tipoEquipamento-edit/tipoEquipamento-edit.component';
import { TipoEquipamentoDetailsComponent } from './tipoEquipamento-details/tipoEquipamento-details.component';
import { TipoEquipamentosRoutingModule } from './tipoEquipamentos-routing.module';


@NgModule({
    declarations: [TipoEquipamentosComponent, TipoEquipamentoListComponent, TipoEquipamentoEditComponent, TipoEquipamentoDetailsComponent],
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
        TipoEquipamentosRoutingModule,
        NgxMaskModule.forRoot()
    ]
})
export class TipoEquipamentosModule {}
