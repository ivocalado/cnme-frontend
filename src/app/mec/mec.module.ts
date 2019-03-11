import { NgModule } from "@angular/core";
import { MecComponent } from "./mec.component";
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
import { MecEditComponent } from './mec-edit/mec-edit.component';
import { MecDetailsComponent } from './mec-details/mec-details.component';
import { MecRoutingModule } from './mec-routing.module';
import { MecInvitationComponent } from './mec-invitation/mec-invitation.component';


@NgModule({
    declarations: [MecComponent, MecEditComponent, MecDetailsComponent, MecInvitationComponent],
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
        MecRoutingModule,
        NgxMaskModule.forRoot()
    ]
})
export class MecModule { }
