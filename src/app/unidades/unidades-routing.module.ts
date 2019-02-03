import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnidadesComponent } from './unidades.component';
import { UnidadeListComponent } from './unidade-list/unidade-list.component';
import { UnidadeEditComponent } from './unidade-edit/unidade-edit.component';
import { UnidadeDetailsComponent } from './unidade-details/unidade-details.component';

const unidadesRoutes: Routes = [
    {
        path: "",
        component: UnidadesComponent,
        children: [
            { path: "", component: UnidadeListComponent },
            { path: "nova", component: UnidadeEditComponent },
            { path: "editar/:id", component: UnidadeEditComponent },
            { path: "detalhes/:id", component: UnidadeDetailsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(unidadesRoutes)],
    exports: [RouterModule]
})
export class UnidadesRoutingModule { }
