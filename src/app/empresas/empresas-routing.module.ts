import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmpresasComponent } from "./empresas.component";
import { EmpresaListComponent } from "./empresa-list/empresa-list.component";
import { EmpresaEditComponent } from "./empresa-edit/empresa-edit.component";
import { EmpresaDetailsComponent } from "./empresa-details/empresa-details.component";

const empresasRoutes: Routes = [
    {
        path: "",
        component: EmpresasComponent,
        children: [
            { path: "", component: EmpresaListComponent },
            { path: "nova", component: EmpresaEditComponent },
            { path: "editar/:id", component: EmpresaEditComponent },
            { path: "detalhes/:id", component: EmpresaDetailsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(empresasRoutes)],
    exports: [RouterModule]
})
export class EmpresasRoutingModule {}
