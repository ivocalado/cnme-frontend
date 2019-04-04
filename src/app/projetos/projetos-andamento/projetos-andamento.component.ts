import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ProjetoDataService } from 'src/app/_shared/services/projeto-data.service';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';
import { Projeto } from 'src/app/_shared/models/projeto.model';


@Component({
  selector: 'app-projetos-atrasados-list',
  templateUrl: '../_shared/projetos-list.dashboard.html',
  styleUrls: ['../_shared/projetos-list.dashboard.scss']
})
export class ProjetosAndamentoComponent implements OnInit {

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
titulo: string = "Projetos em Andamento"

constructor(
  private projetoDataService: ProjetoDataService,
  private snackBarService: SnackBarService
  ) { }

ngOnInit() {
  this.projetoDataService
  .getProjetosEmPlanejamento()
  .subscribe((projetosEmPlanejamento: Projeto[]) => {
      this.projetosEmAndamento.concat(projetosEmPlanejamento)
      this.projetoDataService.getProjetosEnviados().subscribe((projetosEnviados: Projeto[]) => {
         this.projetosEmAndamento.concat(projetosEnviados)
         this.projetoDataService.getProjetosEntregues().subscribe((projetosEntregues: Projeto[])=> {
            this.projetosEmAndamento.concat(projetosEntregues)
            this.projetoDataService.getProjetosInstalados().subscribe((projetosInstalados: Projeto[]) => {
                this.projetosEmAndamento.concat(projetosInstalados)
                this.dataSource = new MatTableDataSource(this.projetosEmAndamento);
                this.dataSource.sort = this.sort;
            })
         })
      })
      
  });
}

}
