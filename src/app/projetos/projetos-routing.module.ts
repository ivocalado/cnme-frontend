import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjetosComponent } from './projetos.component';
import { ProjetosEditComponent } from './projetos-edit/projetos-edit.component';

const routes: Routes = [
    {
        path: '', component: ProjetosComponent,
        children: [
            {path:'', component:ProjetosEditComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjetosRoutingModule { }
