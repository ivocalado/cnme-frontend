import { NgModule } from "@angular/core";
import { EmpresasComponent } from "./empresas.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import {
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule
} from "@angular/material";
import { NgxMaskModule } from "ngx-mask";

import { SharedModule } from "../_shared/shared.module";
import { EmpresaListComponent } from './empresa-list/empresa-list.component';
import { EmpresaEditComponent } from './empresa-edit/empresa-edit.component';
import { EmpresaDetailsComponent } from './empresa-details/empresa-details.component';
import { EmpresasRoutingModule } from './empresas-routing.module';


@NgModule({
    declarations: [EmpresasComponent, EmpresaListComponent, EmpresaEditComponent, EmpresaDetailsComponent],
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
        EmpresasRoutingModule,
        MatPaginatorModule, 
        NgxMaskModule.forRoot()
    ]
})
export class EmpresasModule { }
