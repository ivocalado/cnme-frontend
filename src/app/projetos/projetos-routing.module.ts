import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjetosComponent } from './projetos.component';
import { ProjetoListComponent } from './projeto-list/projeto-list.component';
import { ProjetoEditComponent } from './projeto-edit/projeto-edit.component';
import { AdicionarKitsComponent } from './adicionar-kits/adicionar-kits.component';
import { PlanejamentoEnvioComponent } from './planejamento-envio/planejamento-envio.component';

const routes: Routes = [
    {
        path: '', component: ProjetosComponent,
        children: [
            { path: '', component: ProjetoListComponent },
            { path: 'novo', component: ProjetoEditComponent },
            { path: 'editar/:id', component: ProjetoEditComponent},
            { path: ':id/adicionar-kits', component: AdicionarKitsComponent },
            { path: ':id/planejar-envio', component: PlanejamentoEnvioComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjetosRoutingModule { }
