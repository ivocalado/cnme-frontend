import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ProjetoDataService } from 'src/app/_shared/services/projeto-data.service';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';
import { Projeto } from 'src/app/_shared/models/projeto.model';
import {Location} from '@angular/common';


@Component({
  selector: 'app-projetos-atrasados-ativacao',
  templateUrl: '../_shared/projetos-list.dashboard.html',
  styleUrls: ['../_shared/projetos-list.dashboard.scss']
})
export class ProjetosAtrasadosAtivacaoComponent implements OnInit {

  displayedColumns: string[] = [
    "numero",
    "unidade",
    "previsao",
    "status",
    "actions"
  ];
  projetosEmAndamento : Projeto[] = []
  dataSource;
  @ViewChild(MatSort) sort: MatSort;
  titulo: string = "Projetos com Atraso na Ativação"

  constructor(
    private projetoDataService: ProjetoDataService,
    private snackBarService: SnackBarService,
    private location: Location
  ) { }

  ngOnInit() {
    this.projetoDataService.getProjetosAtrasadosEmAtivacao().subscribe((projetos: Projeto[]) => {
      this.projetosEmAndamento = projetos
    })
  }

  onCancel() {
    this.location.back()
  }
}
