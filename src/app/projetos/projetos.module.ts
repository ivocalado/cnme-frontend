import { NgModule } from '@angular/core';
import { ProjetosRoutingModule } from './projetos-routing.module';
import { ProjetosComponent } from './projetos.component';
import { ProjetoEditComponent } from './projeto-edit/projeto-edit.component';
import { SharedModule } from '../_shared/shared.module';
import { MatStepperModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatCardModule, MatTableModule, MatDatepickerModule, MatNativeDateModule, MatSortModule, MatRadioModule,
    MatChipsModule, MatRippleModule, MatCheckboxModule, MatExpansionModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS,
    DateAdapter, MatPaginatorModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { ProjetoListComponent } from './projeto-list/projeto-list.component';
import { UnidadeDataService } from '../_shared/services/unidade-data.service';
import { SnackBarService } from '../_shared/helpers/snackbar.service';
import { ProjetoDataService } from '../_shared/services/projeto-data.service';
import { AdicionarKitsComponent } from './adicionar-kits/adicionar-kits.component';
import { KitDataService } from '../_shared/services/kit-data.service';
import { EtapaEnvioComponent } from './etapa-envio/etapa-envio.component';
import { EnvioListComponent } from './etapa-envio/envio-list/envio-list.component';
import { ProjetoDetailsComponent } from './projeto-details/projeto-details.component';
import { EtapaInstalacaoComponent } from './etapa-instalacao/etapa-instalacao.component';
import { EtapaAtivacaoComponent } from './etapa-ativacao/etapa-ativacao.component';
import { ProjetoCancelComponent } from './projeto-cancel/projeto-cancel.component';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from "@angular/material-moment-adapter";
import { MomentUtcDateAdapter } from '../_shared/helpers/moment-utc-date-adapter';
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

@NgModule({
    declarations: [
        ProjetosComponent,
        ProjetoEditComponent,
        ProjetoListComponent,
        AdicionarKitsComponent,
        EtapaEnvioComponent,
        EnvioListComponent,
        ProjetoDetailsComponent,
        EtapaInstalacaoComponent,
        EtapaAtivacaoComponent,
        ProjetoCancelComponent,
        ProjetosAtrasadosListComponent,
        ProjetosConcluidosComponent,
        ProjetosAndamentoComponent,
        ProjetosAtrasadosEnvioComponent,
        ProjetosAtrasadosInstalacaoComponent,
        ProjetosAtrasadosAtivacaoComponent,
        ProjetosEmPlanejamentoComponent,
        ProjetosEnviadosComponent,
        ProjetosEntreguesComponent,
        ProjetosInstaladosComponent,
        ProjetosCanceladosComponent,
        ProjetosPorEstadosComponent
    ],
    imports: [
        SharedModule,
        ProjetosRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatStepperModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatNativeDateModule,
        MatRadioModule,
        MatChipsModule,
        MatRippleModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatPaginatorModule

    ],
    providers: [
        UnidadeDataService,
        ProjetoDataService,
        SnackBarService,
        KitDataService,
        { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
        { provide: DateAdapter, useClass: MomentUtcDateAdapter },
    ]
})
export class ProjetosModule {}
