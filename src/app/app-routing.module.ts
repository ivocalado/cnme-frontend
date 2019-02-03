import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";

const appRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: "unidades",loadChildren: "./unidades/unidades.module#UnidadesModule"},
    { path: "polos", loadChildren: "./polos/polos.module#PolosModule" },
    { path: "empresas", loadChildren: "./empresas/empresas.module#EmpresasModule" },
    { path: "usuarios", loadChildren: "./usuarios/usuarios.module#UsuariosModule" }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
