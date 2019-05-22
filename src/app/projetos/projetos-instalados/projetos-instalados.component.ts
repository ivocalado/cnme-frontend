import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { ProjetoDataService } from 'src/app/_shared/services/projeto-data.service';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';
import { Projeto } from 'src/app/_shared/models/projeto.model';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_shared/services/auth.service';
@Component({
  selector: 'app-projetos-instalados',
  templateUrl: '../_shared/projetos-list.dashboard.html',
  styleUrls: ['../_shared/projetos-list.dashboard.scss']
})
export class ProjetosInstaladosComponent implements OnInit {

  displayedColumns: string[] = [
    "numero",
    "unidade",
    "previsao",
    "status",
    "actions"
];
dataSource;
@ViewChild(MatSort) sort: MatSort;
titulo: string = "Projetos Instalado"

    // "links": {
    //     "first": "https://cnme-dev.nees.com.br/api/projeto-cnme?page=1",
    //     "last": "https://cnme-dev.nees.com.br/api/projeto-cnme?page=1",
    //     "prev": null,
    //     "next": null
    // },
    // "meta": {
    //     "current_page": 1,
    //     "from": 1,
    //     "last_page": 1,
    //     "path": "https://cnme-dev.nees.com.br/api/projeto-cnme",
    //     "per_page": 25,
    //     "to": 1,
    //     "total": 1
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
    private projetoDataService: ProjetoDataService,
    private snackBarService: SnackBarService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit() {
    if(!this.isAdmin) {
      this.snackBarService.openSnackBar("Requisição inválida.");
      this.router.navigate(["/"], { relativeTo: this.route });
      return
    }
    this.fetchProjetos(this.INITIAL_PAGE_SIZE, this.INITIAL_PAGE_INDEX)
  }

  get isAdmin() {
    let usuarioAutenticado = this.authService.getCurrentUser();
    let classe = usuarioAutenticado.unidade.classe;
    return classe == "admin" || classe == "tvescola" || classe == "mec";
  }

  fetchProjetos(pageSize: number, pageIndex: number) {
    this.projetoDataService
    .getProjetosPorStatus("INSTALADO", pageSize, pageIndex)
        .subscribe((res: any) => {
            this.dataSource = new MatTableDataSource(res.projetos);
            this.dataSource.sort = this.sort;
            this.buildPagination(res.links, res.meta)
        });
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

  onCancel() {
    this.location.back()
  }

  onDetails(id: number) {
    this.router.navigate(["/projetos/detalhes", id], { relativeTo: this.route });
  } 

  applyFilter(filterValue: string) {
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  newPaginationEvent(pageEvent: PageEvent) {
    this.fetchProjetos(pageEvent.pageSize, pageEvent.pageIndex + 1)
  }  
  
  get enableLegenda() {
    return false
  }
}
