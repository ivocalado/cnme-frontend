import { Component, OnInit, ViewChild } from '@angular/core';
import { ChamadoDataService } from 'src/app/_shared/services/chamado-data.service';
import { MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { Unidade } from 'src/app/_shared/models/unidade.model';
import { UnidadeDataService } from 'src/app/_shared/services/unidade-data.service';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';

@Component({
  selector: 'app-chamados-list',
  templateUrl: './chamados-list.component.html',
  styleUrls: ['./chamados-list.component.scss']
})
export class ChamadosListComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ["id", "status", "assunto", "actions"];
    dataSourceOriginados; //usado por todos
    dataSourceRecebidos; //usado pelo admin, mec e tvescola
    dataSourceMec; //usado pelo admin
    dataSourceTvEscola; //usado pelo admin
    dataSourcePolos; //usado pelo admin
    currentUnidade: Unidade
    mec_id: number//usado pelo admin
    tv_escola_id: number//usado pelo admin

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
    ORIGINADOS: {//usado por todos
    firstPageLink: null,
    lastPageLink: null,
    previousPageLink: null,
    nextPageLink: null,
    currentPageIndex: null,
    itens_per_page: null,
    total: null
  },

  RECEBIDOS: {//usado pelo admin, mec e tvescola
    firstPageLink: null,
    lastPageLink: null,
    previousPageLink: null,
    nextPageLink: null,
    currentPageIndex: null,
    itens_per_page: null,
    total: null
  },

  MEC: {//usado pelo admin
    firstPageLink: null,
    lastPageLink: null,
    previousPageLink: null,
    nextPageLink: null,
    currentPageIndex: null,
    itens_per_page: null,
    total: null
  },

   TV_ESCOLA: {//usado pelo admin
    firstPageLink: null,
    lastPageLink: null,
    previousPageLink: null,
    nextPageLink: null,
    currentPageIndex: null,
    itens_per_page: null,
    total: null
  },

  POLOS: {//usado pelo admin
    firstPageLink: null,
    lastPageLink: null,
    previousPageLink: null,
    nextPageLink: null,
    currentPageIndex: null,
    itens_per_page: null,
    total: null
  }
}
  

  INITIAL_PAGE_INDEX: number = 1
  INITIAL_PAGE_SIZE: number = 10
  pageSizeOptions: number[] = [5, 10, 25, 100];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chamadoDataService: ChamadoDataService,
    private authService: AuthService,
    private unidadeDataService: UnidadeDataService,
    private snackBarService: SnackBarService
    ) { }


  

  ngOnInit() {
    this.currentUnidade = this.authService.getCurrentUser().unidade
    if(this.currentUnidade)
      this.fetchAllChamados()
  }

  fetchAllChamados() {
    this.fetchChamadosOriginados(this.INITIAL_PAGE_SIZE, this.INITIAL_PAGE_INDEX)
    if(!this.isPolo) {
      this.fetchChamadosRecebidos(this.INITIAL_PAGE_SIZE, this.INITIAL_PAGE_INDEX)
    }

    if(this.isAdmin) {
      this.unidadeDataService.getMec().subscribe((unidade: Unidade) => {
        this.mec_id = unidade.id
        this.fetchChamadosMecAsResponsavel(this.INITIAL_PAGE_SIZE, this.INITIAL_PAGE_INDEX)
      })

      this.unidadeDataService.getTvEscola().subscribe((unidade: Unidade) =>{
        this.tv_escola_id = unidade.id
        this.fetchChamadosTvEscolaAsResponsavel(this.INITIAL_PAGE_SIZE, this.INITIAL_PAGE_INDEX)  
      })

      this.fetchChamadosPolosAsCriador(this.INITIAL_PAGE_SIZE, this.INITIAL_PAGE_INDEX )
      
    }
  }

  fetchChamadosOriginados(pageSize: number, pageIndex: number) {
    let unidade_id: number = this.currentUnidade.id
    this.chamadoDataService
        .getChamadosAsCriador(unidade_id, pageSize, pageIndex)
        .subscribe((res: any) => {
            this.dataSourceOriginados = new MatTableDataSource(res.chamados);
            this.dataSourceOriginados.sort = this.sort;
            this.buildPagination(this.pagination["ORIGINADOS"], res.links, res.meta)
        });
  }

  fetchChamadosRecebidos(pageSize: number, pageIndex: number) {
    let unidade_id: number = this.currentUnidade.id
    this.chamadoDataService
        .getChamadosAsResponsavel(unidade_id, pageSize, pageIndex)
        .subscribe((res: any) => {
            this.dataSourceRecebidos = new MatTableDataSource(res.chamados);
            this.dataSourceRecebidos.sort = this.sort;
            this.buildPagination(this.pagination["RECEBIDOS"], res.links, res.meta)
        });    
  }

  fetchChamadosMecAsResponsavel(pageSize: number, pageIndex: number) {
    let unidade_id: number = this.mec_id
    this.chamadoDataService
        .getChamadosAsResponsavel(unidade_id, pageSize, pageIndex)
        .subscribe((res: any) => {
            this.dataSourceMec = new MatTableDataSource(res.chamados);
            this.dataSourceMec.sort = this.sort;
            this.buildPagination(this.pagination["MEC"], res.links, res.meta)
        });    
  }

  fetchChamadosTvEscolaAsResponsavel(pageSize: number, pageIndex: number) {
    let unidade_id: number = this.tv_escola_id
    this.chamadoDataService
        .getChamadosAsResponsavel(unidade_id, pageSize, pageIndex)
        .subscribe((res: any) => {
            this.dataSourceTvEscola = new MatTableDataSource(res.chamados);
            this.dataSourceTvEscola.sort = this.sort;
            this.buildPagination(this.pagination["TV_ESCOLA"], res.links, res.meta)
        });    
  }

  fetchChamadosPolosAsCriador(pageSize: number, pageIndex: number) {
    this.chamadoDataService
        .getChamadosPolosAsCriador(pageSize, pageIndex)
        .subscribe((res: any) => {
            this.dataSourcePolos = new MatTableDataSource(res.chamados);
            this.dataSourcePolos.sort = this.sort;
            this.buildPagination(this.pagination["POLOS"], res.links, res.meta)
        });
  }
  
  buildPagination(pagination: any, links: any, meta: any) {
      if(!links)
        return
      pagination.firstPageLink = links.first
      pagination.lastPageLink = links.last
      pagination.previousPageLink = links.prev
      pagination.nextPageLink = links.next
      pagination.currentPageIndex = meta.current_page
      pagination.itens_per_page = meta.per_page
      pagination.total = meta.total
  }  

  applyFilter(tipo: string, filterValue: string) {
    if(tipo == "ORIGINADOS") {
      this.dataSourceOriginados.filter = filterValue.trim().toLowerCase();
    } else if(tipo == "RECEBIDOS") {
      this.dataSourceRecebidos.filter = filterValue.trim().toLowerCase();
    } else if(tipo == "MEC") {
      this.dataSourceMec.filter = filterValue.trim().toLowerCase();
    } else if(tipo == "TV_ESCOLA") {
      this.dataSourceTvEscola.filter = filterValue.trim().toLowerCase();
    } else {
      this.dataSourcePolos.filter = filterValue.trim().toLowerCase();
    }
    
  }

  newPaginationEvent(tipo: string, pageEvent: PageEvent) {
    if(tipo == "ORIGINADOS") {
      this.fetchChamadosOriginados(pageEvent.pageSize, pageEvent.pageIndex + 1)
    } else if(tipo == "RECEBIDOS") {
      this.fetchChamadosRecebidos(pageEvent.pageSize, pageEvent.pageIndex + 1)
    } else if(tipo == "MEC") {
      this.fetchChamadosMecAsResponsavel(pageEvent.pageSize, pageEvent.pageIndex + 1)
    } else if(tipo == "TV_ESCOLA") {
      this.fetchChamadosTvEscolaAsResponsavel(pageEvent.pageSize, pageEvent.pageIndex + 1)
    } else {
      this.fetchChamadosPolosAsCriador(pageEvent.pageSize, pageEvent.pageIndex + 1)
    }
  }

  onDetails(id: Number) {
    this.router.navigate(['detalhes', id], { relativeTo: this.route });
}

  onDelete(id: number) {
    if (confirm("Tem certeza que deseja deletar este chamado?")) {
        this.chamadoDataService.deleteChamado(id).subscribe(res => {
          this.snackBarService.openSnackBar("Chamado deletado com sucesso!")
          this.fetchAllChamados()
          this.router.navigate(['/chamados'], { relativeTo: this.route });
        })
    }
  }

  get isPolo() {
    return this.currentUnidade.classe == "polo"
  }

  get isAdmin() {
    return this.currentUnidade.classe == "admin"
  }

  canDelete(classe: string) {
    return this.isAdmin || this.currentUnidade.classe == classe
  }

}
