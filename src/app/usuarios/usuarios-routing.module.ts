import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioDetailsComponent } from './usuario-details/usuario-details.component';
import { UsuarioConfirmInvitationComponent } from './usuario-confirm-invitation/usuario-confirm-invitation.component';
import { UsuarioNovaSenhaComponent } from './usuario-nova-senha/usuario-nova-senha.component';

const routes: Routes = [
    {
        path: '', component: UsuariosComponent,
        children:[
            {path:'', component:UsuarioListComponent},
            {path:'novo',component:UsuarioEditComponent},
            {path:'editar/:id', component:UsuarioEditComponent},
            {path: "detalhes/:id", component: UsuarioDetailsComponent },
            {path:"confirmar", component:UsuarioConfirmInvitationComponent},
            {path:"novasenha/validar/:email/:token", component:UsuarioNovaSenhaComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuariosRoutingModule { }
