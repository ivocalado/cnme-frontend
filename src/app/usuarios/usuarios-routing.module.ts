import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioDetailsComponent } from './usuario-details/usuario-details.component';

const routes: Routes = [
    {
        path: '', component: UsuariosComponent,
        children:[
            {path:'', component:UsuarioListComponent},
            {path:'novo',component:UsuarioEditComponent},
            {path:'editar/:id', component:UsuarioEditComponent},
            { path: "detalhes/:id", component: UsuarioDetailsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuariosRoutingModule { }
