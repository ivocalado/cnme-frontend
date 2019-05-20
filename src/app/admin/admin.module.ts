import { NgModule } from "@angular/core";
import { AdminComponent } from "./admin.component";
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
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminInvitationComponent } from './admin-invitation/admin-invitation.component';


@NgModule({
    declarations: [AdminComponent, AdminDetailsComponent, AdminEditComponent, AdminInvitationComponent ],
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
        AdminRoutingModule,
        MatPaginatorModule,
        NgxMaskModule.forRoot()
    ]
})
export class AdminModule { }
