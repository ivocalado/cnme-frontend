import { NgModule } from "@angular/core";
import { TvEscolaComponent } from "./tvescola.component";
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
import { TvEscolaEditComponent } from './tvescola-edit/tvescola-edit.component';
import { TvEscolaDetailsComponent } from './tvescola-details/tvescola-details.component';
import { TvEscolaRoutingModule } from './tvescola-routing.module';
import { TvEscolaInvitationComponent } from './tvescola-invitation/tvescola-invitation.component';


@NgModule({
    declarations: [TvEscolaComponent, TvEscolaEditComponent, TvEscolaDetailsComponent, TvEscolaInvitationComponent],
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
        TvEscolaRoutingModule,
        NgxMaskModule.forRoot()
    ]
})
export class TvEscolaModule { }
