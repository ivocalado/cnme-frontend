import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipamentosComponent } from './equipamentos.component';
import { EquipamentoListComponent } from './equipamento-list/equipamento-list.component';
import { EquipamentoEditComponent } from './equipamento-edit/equipamento-edit.component';
import { EquipamentoDetailsComponent } from './equipamento-details/equipamento-details.component';

const equipamentosRoutes: Routes = [
    {
        path: "",
        component: EquipamentosComponent,
        children: [
            { path: "", component: EquipamentoListComponent },
            { path: "nova", component: EquipamentoEditComponent },
            { path: "editar/:id", component: EquipamentoEditComponent },
            { path: "detalhes/:id", component: EquipamentoDetailsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(equipamentosRoutes)],
    exports: [RouterModule]
})
export class EquipamentosRoutingModule { }
