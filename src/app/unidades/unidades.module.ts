import { NgModule } from "@angular/core";
import { UnidadesComponent } from "./unidades.component";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import {
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule
} from "@angular/material";

import { SharedModule } from "../shared/shared.module";
import { UnidadeListComponent } from './unidade-list/unidade-list.component';
import { UnidadeEditComponent } from './unidade-edit/unidade-edit.component';

const unidadesRoutes: Routes = [{
    path: "", component: UnidadesComponent,
    children: [
        { path: "", component: UnidadeListComponent },
        { path: "nova", component: UnidadeEditComponent },
        { path: "editar/:id", component: UnidadeEditComponent }
    ]
}];

@NgModule({
    declarations: [UnidadesComponent, UnidadeListComponent, UnidadeEditComponent],
    imports: [
        SharedModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        RouterModule.forChild(unidadesRoutes)
    ]
})
export class UnidadesModule {}
