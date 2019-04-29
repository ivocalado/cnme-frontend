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
import { ProjetosAndamentoComponent } from './projetos-andamento/projetos-andamento.component';
import { ProjetosAtrasadosEnvioComponent } from './projetos-atrasados-envio/projetos-atrasados-envio.component';
import { ProjetosAtrasadosInstalacaoComponent } from './projetos-atrasados-instalacao/projetos-atrasados-instalacao.component';
import { ProjetosAtrasadosAtivacaoComponent } from './projetos-atrasados-ativacao/projetos-atrasados-ativacao.component';
import { ProjetosEmPlanejamentoComponent } from './projetos-em-planejamento/projetos-em-planejamento.component';
import { ProjetosEnviadosComponent } from './projetos-enviados/projetos-enviados.component';
import { ProjetosEntreguesComponent } from './projetos-entregues/projetos-entregues.component';
import { ProjetosInstaladosComponent } from './projetos-instalados/projetos-instalados.component';
import { ProjetosCanceladosComponent } from './projetos-cancelados/projetos-cancelados.component';
import { ProjetosPorEstadosComponent } from './projetos-por-estados/projetos-por-estados.component';
import { ChecklistComponent } from './checklist/checklist.component';

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
            { path: 'atrasados/envio', component: ProjetosAtrasadosEnvioComponent },
            { path: 'atrasados/instalacao', component: ProjetosAtrasadosInstalacaoComponent },
            { path: 'atrasados/ativacao', component: ProjetosAtrasadosAtivacaoComponent },
            { path: 'concluidos', component: ProjetosConcluidosComponent},
            { path: 'andamento', component: ProjetosAndamentoComponent},
            { path: 'planejamento', component: ProjetosEmPlanejamentoComponent},
            { path: 'enviados', component: ProjetosEnviadosComponent},
            { path: 'entregues', component: ProjetosEntreguesComponent},
            { path: 'instalados', component: ProjetosInstaladosComponent},
            { path: 'cancelados', component: ProjetosCanceladosComponent},
            { path: 'ativados', component: ProjetosConcluidosComponent},
            { path: 'por-estado/:uf', component: ProjetosPorEstadosComponent},
            { path: 'checklist', component: ChecklistComponent }
            //{ path: ':id/etapa-envio/:etapaId', component: EtapaEnvioComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjetosRoutingModule { }
