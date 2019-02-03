import { NgModule } from "@angular/core";
import { UnidadesComponent } from "./unidades.component";
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
import { UnidadeListComponent } from './unidade-list/unidade-list.component';
import { UnidadeEditComponent } from './unidade-edit/unidade-edit.component';
import { UnidadeDetailsComponent } from './unidade-details/unidade-details.component';
import { UnidadesRoutingModule } from './unidades-routing.module';


@NgModule({
    declarations: [UnidadesComponent, UnidadeListComponent, UnidadeEditComponent, UnidadeDetailsComponent],
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
        UnidadesRoutingModule,
        NgxMaskModule.forRoot()
    ]
})
export class UnidadesModule {}
