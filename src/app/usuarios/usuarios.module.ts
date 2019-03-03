import { NgModule } from '@angular/core';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { SharedModule } from '../_shared/shared.module';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatCardModule, MatTableModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { UsuarioDetailsComponent } from './usuario-details/usuario-details.component';

@NgModule({
    declarations: [UsuariosComponent, UsuarioListComponent, UsuarioEditComponent, UsuarioDetailsComponent],
    imports: [
        SharedModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        UsuariosRoutingModule
    ]
})
export class UsuariosModule { }
