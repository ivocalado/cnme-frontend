import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjetosComponent } from './projetos.component';
import { ProjetoListComponent } from './projeto-list/projeto-list.component';
import { ProjetoEditComponent } from './projeto-edit/projeto-edit.component';
import { AdicionarKitsComponent } from './adicionar-kits/adicionar-kits.component';
import { EtapaEnvioComponent } from './etapa-envio/etapa-envio.component';
import { EnvioListComponent } from './etapa-envio/envio-list/envio-list.component';
import { ProjetoDetailsComponent } from './projeto-details/projeto-details.component';
import { EtapaInstalacaoComponent } from './etapa-instalacao/etapa-instalacao.component';
import { EtapaAtivacaoComponent } from './etapa-ativacao/etapa-ativacao.component';
import { ProjetoCancelComponent } from './projeto-cancel/projeto-cancel.component';
import { ProjetosAtrasadosListComponent } from './projetos-atrasados-list/projetos-atrasados-list.component';
import { ProjetosConcluidosComponent } from './projetos-concluidos/projetos-concluidos.component';

const routes: Routes = [
    {
        path: '', component: ProjetosComponent,
        children: [
            { path: '', component: ProjetoListComponent },
            { path: 'novo', component: ProjetoEditComponent },
            { path: 'editar/:id', component: ProjetoEditComponent},
            { path: 'detalhes/:id', component: ProjetoDetailsComponent},
            { path: 'cancelar/:id', component: ProjetoCancelComponent},
            { path: 'editar/:id/step/:stepId', component: ProjetoEditComponent },
            { path: ':id/adicionar-kits', component: AdicionarKitsComponent },
            { path: ':id/etapa-envio', component: EtapaEnvioComponent, runGuardsAndResolvers: 'always' },
            { path: ':id/tarefas-envio', component: EnvioListComponent },
            { path: ':id/etapa-instalacao', component: EtapaInstalacaoComponent },
            { path: ':id/etapa-ativacao', component: EtapaAtivacaoComponent },
            { path: 'atrasados', component: ProjetosAtrasadosListComponent},
            { path: 'concluidos', component: ProjetosConcluidosComponent},
            //{ path: ':id/etapa-envio/:etapaId', component: EtapaEnvioComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjetosRoutingModule { }
