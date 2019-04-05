import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ProjetoDataService } from 'src/app/_shared/services/projeto-data.service';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';
import { Projeto } from 'src/app/_shared/models/projeto.model';


@Component({
  selector: 'app-projetos-atrasados-instalacao',
  templateUrl: '../_shared/projetos-list.dashboard.html',
  styleUrls: ['../_shared/projetos-list.dashboard.scss']
})
export class ProjetosAtrasadosInstalacaoComponent implements OnInit {
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
  titulo: string = "Projetos com Atraso na Instalação"

  constructor(
    private projetoDataService: ProjetoDataService,
    private snackBarService: SnackBarService
    ) { }

  ngOnInit() {
    this.projetoDataService.getProjetosAtrasadosEmInstalacao().subscribe((projetos: Projeto[]) => {
      this.projetosEmAndamento = projetos
    })
  }

}
