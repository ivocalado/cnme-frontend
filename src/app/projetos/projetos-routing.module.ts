import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjetosComponent } from './projetos.component';
import { ProjetoListComponent } from './projeto-list/projeto-list.component';
import { ProjetosEditComponent } from './projetos-edit/projetos-edit.component';
import { AdicionarKitsComponent } from './adicionar-kits/adicionar-kits.component';

const routes: Routes = [
    {
        path: '', component: ProjetosComponent,
        children: [
            { path: '', component: ProjetoListComponent },
            { path: 'novo', component: ProjetosEditComponent },
            { path: 'editar/:id', component: ProjetosEditComponent},
            { path: ':id/adicionar-kits', component: AdicionarKitsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjetosRoutingModule { }
