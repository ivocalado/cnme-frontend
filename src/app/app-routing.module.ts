import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PolosComponent } from "./polos/polos.component";
import { HomeComponent } from "./home/home.component";

const appRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: "polos", component: PolosComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
