import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KitsComponent } from './kits.component';
import { KitListComponent } from './kit-list/kit-list.component';
import { KitEditComponent } from './kit-edit/kit-edit.component';
import { KitDetailsComponent } from './kit-details/kit-details.component';

const kitsRoutes: Routes = [
    {
        path: "",
        component: KitsComponent,
        children: [
            { path: "", component: KitListComponent },
            { path: "nova", component: KitEditComponent },
            { path: "editar/:id", component: KitEditComponent },
            { path: "detalhes/:id", component: KitDetailsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(kitsRoutes)],
    exports: [RouterModule]
})
export class KitsRoutingModule { }
