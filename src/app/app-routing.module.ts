import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";

const appRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: "polos", loadChildren: "./polos/polos.module#PolosModule" },
    { path: "unidades",loadChildren: "./unidades/unidades.module#UnidadesModule"}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
