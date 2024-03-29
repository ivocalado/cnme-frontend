import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnidadeDataService } from 'src/app/_shared/services/unidade-data.service';
import { Unidade } from 'src/app/_shared/models/unidade.model';
import { MatTableDataSource, MatSort, PageEvent } from '@angular/material';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';
import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
    selector: "app-polo-list",
    templateUrl: "./polo-list.component.html",
    styleUrls: ["./polo-list.component.scss"]
})
export class PoloListComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ["nome", "tipo", "estado", "actions"];
    dataSource;

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
        private unidadeDataService: UnidadeDataService,
        private snackBarService: SnackBarService,
        private authService: AuthService,
    ) {}

    ngOnInit() {
        if(this.isAdmin) {
            this.fetchUnidades(this.INITIAL_PAGE_SIZE, this.INITIAL_PAGE_INDEX);
        } else {
            this.snackBarService.openSnackBar("Requisição inválida.");
            this.router.navigate(["/"], { relativeTo: this.route });
            return
        }
    }

    get isAdmin() {
        let usuarioAutenticado = this.authService.getCurrentUser();
        let classe = usuarioAutenticado.unidade.classe;
        return classe == "admin" || classe == "tvescola" || classe == "mec";
    }

    onEdit(id: number) {
        this.router.navigate(["editar", id], { relativeTo: this.route });
    }

    onDetails(id: number) {
        this.router.navigate(['detalhes', id], { relativeTo: this.route });
    }

    onDelete(id: number) {
        if (confirm("Tem certeza que deseja deletar este polo")) {
            this.unidadeDataService.deleteUnidade(id).subscribe(res => {
                this.fetchUnidades(this.INITIAL_PAGE_SIZE, this.INITIAL_PAGE_INDEX);
            });
        }
    }

    fetchUnidades(pageSize: number, pageIndex: number) {
        this.unidadeDataService
            .getPolos(pageSize, pageIndex)
            .subscribe((res: any) => {
                this.dataSource = new MatTableDataSource(res.unidades);
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

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    newPaginationEvent(pageEvent: PageEvent) {
        this.fetchUnidades(pageEvent.pageSize, pageEvent.pageIndex + 1)
    }
}
