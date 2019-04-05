import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjetoDataService } from 'src/app/_shared/services/projeto-data.service';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Projeto } from 'src/app/_shared/models/projeto.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-projetos-atrasados-list',
  templateUrl: '../_shared/projetos-list.dashboard.html',
  styleUrls: ['../_shared/projetos-list.dashboard.scss']
})
export class ProjetosAtrasadosListComponent implements OnInit {

  displayedColumns: string[] = [
    "numero",
    "unidade",
    "previsao",
    "status",
    "actions"
];
dataSource;
@ViewChild(MatSort) sort: MatSort;
titulo: string = "Projetos em Atraso"

  constructor(
    private projetoDataService: ProjetoDataService,
    private snackBarService: SnackBarService,
    private location: Location
    ) { }

  ngOnInit() {
    this.projetoDataService
    .getProjetosAtrasados()
    .subscribe((projetos: Projeto[]) => {
        this.dataSource = new MatTableDataSource(projetos);
        this.dataSource.sort = this.sort;
    });
  }

  onCancel() {
    this.location.back()
  }

}
