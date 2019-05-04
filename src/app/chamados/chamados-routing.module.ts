import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChamadosComponent } from './chamados.component';
import { ChamadosListComponent } from './chamados-list/chamados-list.component';
import { ChamadoDetailsComponent } from './chamado-details/chamado-details.component';

const chamadosRoutes: Routes = [
    {
        path: "",
        component: ChamadosComponent,
        children: [
             { path: "", component: ChamadosListComponent },
            // { path: "novo", component: MecEditComponent },
            // { path: "editar", component: MecEditComponent },
             { path: "detalhes/:id", component: ChamadoDetailsComponent },
            // { path: "convidar", component: MecInvitationComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(chamadosRoutes)],
  exports: [RouterModule]
})
export class ChamadosRoutingModule { }
