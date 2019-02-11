import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjetosRoutingModule } from './projetos-routing.module';
import { ProjetosComponent } from './projetos.component';
import { ProjetosEditComponent } from './projetos-edit/projetos-edit.component';
import { SharedModule } from '../_shared/shared.module';
import { MatStepperModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, MatTableModule, MatDatepickerModule, MatNativeDateModule, MatSortModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjetoListComponent } from './projeto-list/projeto-list.component';
import { UnidadeDataService } from '../_shared/services/unidade-data.service';
import { SnackBarService } from '../_shared/helpers/snackbar.service';
import { ProjetoDataService } from '../_shared/services/projeto-data.service';

@NgModule({
    declarations: [ProjetosComponent, ProjetosEditComponent, ProjetoListComponent],
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
    ],
    providers:[UnidadeDataService, ProjetoDataService, SnackBarService]
})
export class ProjetosModule { }