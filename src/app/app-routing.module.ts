import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from './auth/auth.guard'

const appRoutes: Routes = [
    { path: "", loadChildren: "./index/index.module#IndexModule", canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
    { path: "dashboard", loadChildren: "./dashboard/dashboard.module#DashboardModule", canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
    { path: "admin", loadChildren: "./admin/admin.module#AdminModule", canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
    { path: "polos", loadChildren: "./polos/polos.module#PolosModule", canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
    { path: "empresas", loadChildren: "./empresas/empresas.module#EmpresasModule", canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
    { path: "tvescola", loadChildren: "./tvescola/tvescola.module#TvEscolaModule", canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
    { path: "mec", loadChildren: "./mec/mec.module#MecModule", canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
    { path: "usuarios", loadChildren: "./usuarios/usuarios.module#UsuariosModule" , canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
    { path: "equipamentos",loadChildren: "./equipamentos/equipamentos.module#EquipamentosModule", canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
    { path: "kits",loadChildren: "./kits/kits.module#KitsModule", canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
    { path: "tipoEquipamentos",loadChildren: "./tipoEquipamentos/tipoEquipamentos.module#TipoEquipamentosModule", canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
    { path: "projetos", loadChildren: "./projetos/projetos.module#ProjetosModule", canActivate: [AuthGuard], canActivateChild: [AuthGuard], runGuardsAndResolvers: 'always'},
    { path: "auth", loadChildren: "./auth/auth.module#AuthModule"},
    { path: "chamados", loadChildren: "./chamados/chamados.module#ChamadosModule", canActivate: [AuthGuard], canActivateChild: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {
        onSameUrlNavigation: 'reload'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
