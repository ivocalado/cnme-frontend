import { NgModule } from "@angular/core";
import { PolosComponent } from "./polos.component";
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
import { PoloEditComponent } from './polo-edit/polo-edit.component';
import { PoloListComponent } from './polo-list/polo-list.component';

const polosRoutes: Routes = [{
    path: "", component: PolosComponent,
    children: [
        { path: "", component: PoloListComponent },
        { path: "novo", component: PoloEditComponent },
        { path: "editar/:id", component: PoloEditComponent }
    ]
}];

@NgModule({
    declarations: [PolosComponent, PoloEditComponent, PoloListComponent],
    imports: [
        SharedModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        RouterModule.forChild(polosRoutes)
    ]
})
export class PolosModule { }
