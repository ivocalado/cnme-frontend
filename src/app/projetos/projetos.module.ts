import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjetosRoutingModule } from './projetos-routing.module';
import { ProjetosComponent } from './projetos.component';
import { ProjetoEditComponent } from './projeto-edit/projeto-edit.component';
import { SharedModule } from '../_shared/shared.module';
import { MatStepperModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, MatTableModule, MatDatepickerModule, MatNativeDateModule, MatSortModule, MatRadioModule, MatChipsModule, MatRippleModule, MatCheckboxModule, MatExpansionModule } from '@angular/material';
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

@NgModule({
    declarations: [ProjetosComponent, ProjetoEditComponent, ProjetoListComponent, AdicionarKitsComponent, EtapaEnvioComponent, EnvioListComponent, ProjetoDetailsComponent],
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
        MatNativeDateModule,
        MatRadioModule,
        MatChipsModule,
        MatRippleModule,
        MatCheckboxModule,
        MatExpansionModule
    ],
    providers: [UnidadeDataService, ProjetoDataService, SnackBarService, KitDataService]
})
export class ProjetosModule { }
