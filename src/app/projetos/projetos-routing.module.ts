import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjetosComponent } from './projetos.component';
import { ProjetoListComponent } from './projeto-list/projeto-list.component';
import { ProjetoEditComponent } from './projeto-edit/projeto-edit.component';
import { AdicionarKitsComponent } from './adicionar-kits/adicionar-kits.component';
import { EtapaEnvioComponent } from './etapa-envio/etapa-envio.component';
import { EnvioListComponent } from './etapa-envio/envio-list/envio-list.component';
import { ProjetoDetailsComponent } from './projeto-details/projeto-details.component';

const routes: Routes = [
    {
        path: '', component: ProjetosComponent,
        children: [
            { path: '', component: ProjetoListComponent },
            { path: 'novo', component: ProjetoEditComponent },
            { path: 'editar/:id', component: ProjetoEditComponent},
            { path: 'detalhes/:id', component: ProjetoDetailsComponent},
            { path: 'editar/:id/step/:stepId', component: ProjetoEditComponent },
            { path: ':id/adicionar-kits', component: AdicionarKitsComponent },
            { path: ':id/etapa-envio', component: EtapaEnvioComponent },
            { path: ':id/tarefas-envio', component: EnvioListComponent }
            //{ path: ':id/etapa-envio/:etapaId', component: EtapaEnvioComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjetosRoutingModule { }
