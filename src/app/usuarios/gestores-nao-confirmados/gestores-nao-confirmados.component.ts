import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, PageEvent } from '@angular/material';
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

  // "links": {
  //   "first": "https://cnme-dev.nees.com.br/api/usuarios/u/gestores-nao-confirmados?page=1",
  //   "last": "https://cnme-dev.nees.com.br/api/usuarios/u/gestores-nao-confirmados?page=4",
  //   "prev": null,
  //   "next": "https://cnme-dev.nees.com.br/api/usuarios/u/gestores-nao-confirmados?page=2"
  // },
  // "meta": {
  //     "current_page": 1,
  //     "from": 1,
  //     "last_page": 4,
  //     "path": "https://cnme-dev.nees.com.br/api/usuarios/u/gestores-nao-confirmados",
  //     "per_page": 25,
  //     "to": 25,
  //     "total": 81
  // }
  pagination = {
    firstPageLink: null,
    lastPageLink: null,
    previousPageLink: null,
    nextPageLink: null,
    currentPageIndex: null,
    itens_per_page: null,
    total: null
  }

  INITIAL_PAGE_INDEX: number = 1
  INITIAL_PAGE_SIZE: number = 10
  pageSizeOptions: number[] = [5, 10, 25, 100];



  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private snackBarService: SnackBarService,
      private authService: AuthService,
      private location: Location,
      private usuarioDataService: UsuarioDataService
  ) {}

  ngOnInit() {
    if(!this.isAdmin) {
      this.snackBarService.openSnackBar("Requisição inválida.");
      this.router.navigate(["/"], { relativeTo: this.route });
      return
    }
    this.usuarioAutenticado = this.authService.getCurrentUser()
    this.fetchUsuarios(this.INITIAL_PAGE_SIZE, this.INITIAL_PAGE_INDEX)
  }

  get isAdmin() {
    let usuarioAutenticado = this.authService.getCurrentUser();
    let classe = usuarioAutenticado.unidade.classe;
    return classe == "admin" || classe == "tvescola" || classe == "mec";
  }

  onDetails(id:number){
      this.router.navigate(['/usuarios/detalhes', id], { relativeTo: this.route });
  }


  fetchUsuarios(pageSize: number, pageIndex: number) {
    this.usuarioDataService.getGestoresNaoConfirmados(pageSize, pageIndex, this.authService.getToken())
    .subscribe(
      (res) => {
        this.dataSourceUnidade = new MatTableDataSource(res.usuarios);
        this.dataSourceUnidade.sort = this.sortUnidade;
        this.buildPagination(res.links, res.meta)
      },
      error => {
        this.snackBarService.openSnackBar("Ocorreu um erro ao processar a requisição. Tente novamente.")
        this.router.navigate(['/'], { relativeTo: this.route });
      }
    )
  }

  buildPagination(links: any, meta: any) {
    this.pagination.firstPageLink = links.first
    this.pagination.lastPageLink = links.last
    this.pagination.previousPageLink = links.prev
    this.pagination.nextPageLink = links.next
    this.pagination.currentPageIndex = meta.current_page
    this.pagination.itens_per_page = meta.per_page
    this.pagination.total = meta.total
  }

  applyFilter(filterValue: string) {
      this.dataSourceUnidade.filter = filterValue.trim().toLowerCase();
  }

  onCancel() {
    this.location.back()
  }

  newPaginationEvent(pageEvent: PageEvent) {
    this.fetchUsuarios(pageEvent.pageSize, pageEvent.pageIndex + 1)
  }
}
