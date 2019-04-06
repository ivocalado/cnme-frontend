import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Usuario } from 'src/app/_shared/models/usuario.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';
import { AuthService } from 'src/app/_shared/services/auth.service';
import {Location} from '@angular/common';
import { UsuarioDataService } from 'src/app/_shared/services/usuario-data.service';

@Component({
  selector: 'app-gestores-nao-confirmados',
  templateUrl: "../_shared/usuario-list.shared.component.html",
  styleUrls: ["../_shared/usuario-list.shared.component.scss"]
})
export class GestoresNaoConfirmadosComponent implements OnInit {

  @ViewChild(MatSort) sortUnidade: MatSort;

  //Estrutura de dados para exibição dos usuarios da unidade
  displayedColumnsUnidade: string[] = ["nome", "email", "tipo", "actions"];
  dataSourceUnidade;

  readOnly: boolean = false

  usuarioAutenticado: Usuario; 
  title: string = "Lista de Gestores Não Confirmados"


  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private snackBarService: SnackBarService,
      private authService: AuthService,
      private location: Location,
      private usuarioDataService: UsuarioDataService
  ) {}

  ngOnInit() {
      this.usuarioAutenticado = this.authService.getCurrentUser()
      this.fetchUsuarios()
  }

  onDetails(id:number){
      this.router.navigate(['/usuarios/detalhes', id], { relativeTo: this.route });
  }


  fetchUsuarios() {
    this.usuarioDataService.getGestoresNaoConfirmados(this.authService.getToken())
    .subscribe(
      (gestores: Usuario[]) => {
        this.dataSourceUnidade = new MatTableDataSource(gestores);
        this.dataSourceUnidade.sort = this.sortUnidade;
      },
      error => {
        this.snackBarService.openSnackBar("Ocorreu um erro ao processar a requisição. Tente novamente.")
        this.router.navigate(['/'], { relativeTo: this.route });
      }
    )
  }

  applyFilter(filterValue: string) {
      this.dataSourceUnidade.filter = filterValue.trim().toLowerCase();
  }

  onCancel() {
    this.location.back()
  }
}
