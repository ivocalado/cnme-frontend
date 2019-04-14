import { NgModule } from "@angular/core";
import { KitsComponent } from "./kits.component";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import {
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule, MatPaginatorModule 
} from "@angular/material";
import { NgxMaskModule } from "ngx-mask";

import { SharedModule } from "../_shared/shared.module";
import { KitListComponent } from './kit-list/kit-list.component';
import { KitEditComponent } from './kit-edit/kit-edit.component';
import { KitDetailsComponent } from './kit-details/kit-details.component';
import { KitsRoutingModule } from './kits-routing.module';


@NgModule({
    declarations: [KitsComponent, KitListComponent, KitEditComponent, KitDetailsComponent],
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
        KitsRoutingModule,
        MatCheckboxModule,
        MatPaginatorModule,
        NgxMaskModule.forRoot()
    ]
})
export class KitsModule {}
