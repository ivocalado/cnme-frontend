import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoEquipamentosComponent } from './tipoEquipamentos.component';
import { TipoEquipamentoListComponent } from './tipoEquipamento-list/tipoEquipamento-list.component';
import { TipoEquipamentoEditComponent } from './tipoEquipamento-edit/tipoEquipamento-edit.component';
import { TipoEquipamentoDetailsComponent } from './tipoEquipamento-details/tipoEquipamento-details.component';

const tipoEquipamentosRoutes: Routes = [
    {
        path: "",
        component: TipoEquipamentosComponent,
        children: [
            { path: "", component: TipoEquipamentoListComponent },
            { path: "nova", component: TipoEquipamentoEditComponent },
            { path: "editar/:id", component: TipoEquipamentoEditComponent },
            { path: "detalhes/:id", component: TipoEquipamentoDetailsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(tipoEquipamentosRoutes)],
    exports: [RouterModule]
})
export class TipoEquipamentosRoutingModule { }
