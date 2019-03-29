import { NgModule } from '@angular/core';
import { ProjetosRoutingModule } from './projetos-routing.module';
import { ProjetosComponent } from './projetos.component';
import { ProjetoEditComponent } from './projeto-edit/projeto-edit.component';
import { SharedModule } from '../_shared/shared.module';
import { MatStepperModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, MatTableModule, MatDatepickerModule, MatNativeDateModule, MatSortModule, MatRadioModule, MatChipsModule, MatRippleModule, MatCheckboxModule, MatExpansionModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
        ProjetosAtrasadosListComponent
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
        MatExpansionModule
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
