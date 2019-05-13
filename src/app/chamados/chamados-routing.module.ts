import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChamadosComponent } from './chamados.component';
import { ChamadosListComponent } from './chamados-list/chamados-list.component';
import { ChamadoDetailsComponent } from './chamado-details/chamado-details.component';
import { ChamadoCreateComponent } from './chamado-create/chamado-create.component';

const chamadosRoutes: Routes = [
    {
        path: "",
        component: ChamadosComponent,
        children: [
             { path: "", component: ChamadosListComponent },
             { path: "novo", component: ChamadoCreateComponent },
             { path: "detalhes/:id", component: ChamadoDetailsComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(chamadosRoutes)],
  exports: [RouterModule]
})
export class ChamadosRoutingModule { }
