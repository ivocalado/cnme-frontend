import { NgModule } from "@angular/core";
import { PolosComponent } from "./polos.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { PoloListComponent } from './polo-list/polo-list.component';
import { PoloEditComponent } from './polo-edit/polo-edit.component';
import { PoloDetailsComponent } from './polo-details/polo-details.component';
import { PolosRoutingModule } from './polos-routing.module';
import { PoloInvitationComponent } from './polo-invitation/polo-invitation.component';


@NgModule({
    declarations: [PolosComponent, PoloListComponent, PoloEditComponent, PoloDetailsComponent, PoloInvitationComponent],
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
        PolosRoutingModule,
        NgxMaskModule.forRoot()
    ]
})
export class PolosModule { }
