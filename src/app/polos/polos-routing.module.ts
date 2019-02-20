import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PolosComponent } from "./polos.component";
import { PoloListComponent } from "./polo-list/polo-list.component";
import { PoloEditComponent } from "./polo-edit/polo-edit.component";
import { PoloDetailsComponent } from "./polo-details/polo-details.component";
import { PoloInvitationComponent } from './polo-invitation/polo-invitation.component';

const polosRoutes: Routes = [
    {
        path: "",
        component: PolosComponent,
        children: [
            { path: "", component: PoloListComponent },
            { path: "novo", component: PoloEditComponent },
            { path: "editar/:id", component: PoloEditComponent },
            { path: "detalhes/:id", component: PoloDetailsComponent },
            { path: "convidar/:id", component: PoloInvitationComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(polosRoutes)],
  exports: [RouterModule]
})
export class PolosRoutingModule { }
