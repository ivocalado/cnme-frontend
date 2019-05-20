import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from "./admin.component";
import { AdminEditComponent } from "./admin-edit/admin-edit.component";
import { AdminDetailsComponent } from "./admin-details/admin-details.component";
import { AdminInvitationComponent } from './admin-invitation/admin-invitation.component';

const adminRoutes: Routes = [
    {
        path: "",
        component: AdminComponent,
        children: [
            { path: "", component: AdminDetailsComponent },
            { path: "novo", component: AdminEditComponent },
            { path: "editar", component: AdminEditComponent },
            { path: "detalhes", component: AdminDetailsComponent },
            { path: "convidar", component: AdminInvitationComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
