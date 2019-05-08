import { Component, OnInit, ViewChild } from '@angular/core';
import { ChamadoDataService } from 'src/app/_shared/services/chamado-data.service';
import { MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
  selector: 'app-chamados-list',
  templateUrl: './chamados-list.component.html',
  styleUrls: ['./chamados-list.component.scss']
})
export class ChamadosListComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ["id", "status", "assunto", "actions"];
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
    private chamadoDataService: ChamadoDataService,
    private authService: AuthService
    ) { }


  

  ngOnInit() {
    this.fetchChamados(this.INITIAL_PAGE_SIZE, this.INITIAL_PAGE_INDEX)
  }

  fetchChamados(pageSize: number, pageIndex: number) {
    this.chamadoDataService
        .getChamados(pageSize, pageIndex)
        .subscribe((res: any) => {
            this.dataSource = new MatTableDataSource(res.chamados);
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
    this.fetchChamados(pageEvent.pageSize, pageEvent.pageIndex + 1)
  }

  onDetails(id: Number) {
    this.router.navigate(['detalhes', id], { relativeTo: this.route });
}

  onDelete(id: number) {
    if (confirm("Tem certeza que deseja deletar esta empresa?")) {
        // this.unidadeDataService.deleteUnidade(id).subscribe(res => {
        //     this.fetchUnidades(this.INITIAL_PAGE_INDEX);
        // });
    }
  }

  get isPolo() {
    let usuarioAutenticado = this.authService.getCurrentUser();

    return usuarioAutenticado.unidade.classe == "polo"
    
  }

  get isAdmin() {
    let usuarioAutenticado = this.authService.getCurrentUser();

    return usuarioAutenticado.unidade.classe == "admin"
  }


}
