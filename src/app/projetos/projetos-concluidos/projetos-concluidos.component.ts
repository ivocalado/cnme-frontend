import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ProjetoDataService } from 'src/app/_shared/services/projeto-data.service';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';
import { Projeto } from 'src/app/_shared/models/projeto.model';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-projetos-concluidos',
  templateUrl: '../_shared/projetos-list.dashboard.html',
  styleUrls: ['../_shared/projetos-list.dashboard.scss']
})
export class ProjetosConcluidosComponent implements OnInit {

  displayedColumns: string[] = [
    "numero",
    "unidade",
    "previsao",
    "status",
    "actions"
];
dataSource;
@ViewChild(MatSort) sort: MatSort;
titulo: string = "Projetos Concluídos"

  constructor(
    private projetoDataService: ProjetoDataService,
    private snackBarService: SnackBarService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    this.projetoDataService
    .getProjetosConcluidos()
    .subscribe((projetos: Projeto[]) => {
        this.dataSource = new MatTableDataSource(projetos);
        this.dataSource.sort = this.sort;
    });
  }

  onCancel() {
    this.location.back()
  }

  onDetails(id: number) {
    this.router.navigate(["/projetos/detalhes", id], { relativeTo: this.route });
  }  

}

