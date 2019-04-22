import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '../../_shared/helpers/snackbar.service';
import { Usuario } from '../../_shared/models/usuario.model';
import { UnidadeDataService } from '../../_shared/services/unidade-data.service';
import { UsuarioDataService } from '../../_shared/services/usuario-data.service';
import { AuthService } from 'src/app/_shared/services/auth.service';
import {Location} from '@angular/common';

@Component({
    selector: "app-usuario-list",
    templateUrl: "../_shared/usuario-list.shared.component.html",
    styleUrls: ["../_shared/usuario-list.shared.component.scss"]
})
export class UsuarioListComponent implements OnInit {
    @ViewChild(MatSort) sortUnidade: MatSort;

    //Estrutura de dados para exibição dos usuarios da unidade
    displayedColumnsUnidade: string[] = ["nome", "email", "tipo", "actions"];
    dataSourceUnidade;

    readOnly: boolean = false

    usuarioAutenticado: Usuario; 
    usuariosUnidade: Usuario[]
    title: string = "Lista de Usuários da Unidade"

      // "links": {
  //   "first": "https://cnme-dev.nees.com.br/api/chamados?page=1",
  //   "last": "https://cnme-dev.nees.com.br/api/chamados?page=12",
  //   "prev": null,
  //   "next": "https://cnme-dev.nees.com.br/api/chamados?page=2"
  // },
  // "meta": {
  //   "current_page": 1,
  //   "from": 1,
  //   "last_page": 12,
  //   "path": "https://cnme-dev.nees.com.br/api/chamados",
  //   "per_page": "2",
  //   "to": 2,
  //   "total": 23
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
        private unidadeDataService: UnidadeDataService,
        private location: Location
    ) {}

    ngOnInit() {
        this.usuarioAutenticado = this.authService.getCurrentUser()
        this.fetchUsuarios(this.INITIAL_PAGE_SIZE, this.INITIAL_PAGE_INDEX)
    }

    onDetails(id:number){
        this.router.navigate(['detalhes', id], { relativeTo: this.route });
    }

    onEdit(id: number) {
        this.router.navigate(["editar", id], { relativeTo: this.route });
    }

    onDelete(id: number) {
        this.snackBarService.openSnackBar("implantar método para deletar");
    }

    fetchUsuarios(pageSize: number, pageIndex: number) {
        this.unidadeDataService.getUnidade(this.usuarioAutenticado.unidade_id).subscribe(unidade => {
            this.unidadeDataService.getUsuariosAtivosByUnidade(this.usuarioAutenticado.id, pageSize, pageIndex).subscribe((res: any)  => {
                this.usuariosUnidade = res.usuarios
                this.dataSourceUnidade = new MatTableDataSource(res.usuarios);
                this.dataSourceUnidade.sort = this.sortUnidade;
                this.buildPagination(res.links, res.meta)
            })
        })
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
