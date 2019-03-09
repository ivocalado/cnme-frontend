import { NgModule } from '@angular/core';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { SharedModule } from '../_shared/shared.module';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatCardModule, MatTableModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioDetailsComponent } from './usuario-details/usuario-details.component';
import { UsuarioDataService } from '../_shared/services/usuario-data.service';
import { AuthService } from '../_shared/services/auth.service';
import { NgxMaskModule } from "ngx-mask";
import { Permissions } from '../auth/auth.guard';
import { UsuarioConfirmInvitationComponent } from './usuario-confirm-invitation/usuario-confirm-invitation.component';

@NgModule({
    declarations: [UsuariosComponent, UsuarioListComponent, UsuarioEditComponent, UsuarioDetailsComponent, UsuarioConfirmInvitationComponent],
    imports: [
        SharedModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        UsuariosRoutingModule,
        NgxMaskModule.forRoot()
    ],
    providers: [UsuarioDataService, AuthService, Permissions]
})
export class UsuariosModule { }
