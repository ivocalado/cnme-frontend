import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from './auth/auth.guard'
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
    { path: "", loadChildren: "./dashboard/dashboard.module#DashboardModule", canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
    { path: "unidades",loadChildren: "./unidades/unidades.module#UnidadesModule", canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
    { path: "polos", loadChildren: "./polos/polos.module#PolosModule", canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
    { path: "empresas", loadChildren: "./empresas/empresas.module#EmpresasModule", canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
    { path: "usuarios", loadChildren: "./usuarios/usuarios.module#UsuariosModule" , canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
    { path: "equipamentos",loadChildren: "./equipamentos/equipamentos.module#EquipamentosModule", canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
    { path: "kits",loadChildren: "./kits/kits.module#KitsModule", canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
    { path: "tipoEquipamentos",loadChildren: "./tipoEquipamentos/tipoEquipamentos.module#TipoEquipamentosModule", canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
    { path: "projetos", loadChildren: "./projetos/projetos.module#ProjetosModule", canActivate: [AuthGuard], canActivateChild: [AuthGuard], runGuardsAndResolvers: 'always'},
    { path: "auth", loadChildren: "./auth/auth.module#AuthModule"}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {
        onSameUrlNavigation: 'reload'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
