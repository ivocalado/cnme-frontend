import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TvEscolaComponent } from "./tvescola.component";
import { TvEscolaEditComponent } from "./tvescola-edit/tvescola-edit.component";
import { TvEscolaDetailsComponent } from "./tvescola-details/tvescola-details.component";
import { TvEscolaInvitationComponent } from './tvescola-invitation/tvescola-invitation.component';

const tvescolaRoutes: Routes = [
    {
        path: "",
        component: TvEscolaComponent,
        children: [
            { path: "", component: TvEscolaDetailsComponent },
            { path: "novo", component: TvEscolaEditComponent },
            { path: "editar", component: TvEscolaEditComponent },
            { path: "detalhes", component: TvEscolaDetailsComponent },
            { path: "convidar", component: TvEscolaInvitationComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(tvescolaRoutes)],
  exports: [RouterModule]
})
export class TvEscolaRoutingModule { }
