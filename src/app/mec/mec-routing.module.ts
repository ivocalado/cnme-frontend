import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MecComponent } from "./mec.component";
import { MecEditComponent } from "./mec-edit/mec-edit.component";
import { MecDetailsComponent } from "./mec-details/mec-details.component";
import { MecInvitationComponent } from './mec-invitation/mec-invitation.component';

const mecRoutes: Routes = [
    {
        path: "",
        component: MecComponent,
        children: [
            { path: "", component: MecDetailsComponent },
            { path: "novo", component: MecEditComponent },
            { path: "editar", component: MecEditComponent },
            { path: "detalhes", component: MecDetailsComponent },
            { path: "convidar", component: MecInvitationComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(mecRoutes)],
  exports: [RouterModule]
})
export class MecRoutingModule { }
