import { Component, OnInit, ViewChild} from '@angular/core';
import { ProjetoDataService } from 'src/app/_shared/services/projeto-data.service';
import { Projeto } from 'src/app/_shared/models/projeto.model';
import { MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: "app-projeto-list",
    templateUrl: "./projeto-list.component.html",
    styleUrls: ["./projeto-list.component.scss"]
})
export class ProjetoListComponent implements OnInit {
    displayedColumns: string[] = [
        "numero",
        "unidade",
        "previsao",
        "status",
        "actions"
    ];
    dataSource;
    @ViewChild(MatSort) sort: MatSort;

    statusFlag: any = {
        PLANEJAMENTO: true,
        ENVIADO: true,
        ENTREGUE: true,
        INSTALADO: true,
        ATIVADO: true,
        CANCELADO: true
    }

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
        private route: ActivatedRoute,
        private router: Router,
        private projetoDataService: ProjetoDataService,
        private authService: AuthService
    ) {}

    buscaAvancada: boolean = false

    ngOnInit() {
        this.fetchProjetos(this.INITIAL_PAGE_SIZE, this.INITIAL_PAGE_INDEX);
    }

    onDetails(id: number) {
        this.router.navigate(["/projetos/detalhes", id], { relativeTo: this.route });
    }

    onEdit(id: number) {
        this.router.navigate(["/projetos/editar", id], { relativeTo: this.route });
    }
    onDelete(id: number) {
        this.router.navigate(["/projetos/cancelar", id], { relativeTo: this.route });
    }

    fetchProjetos(pageSize: number, pageIndex: number) {
        if(this.isAdmin) {
            let statusToFind = []
            Object.keys(this.statusFlag).forEach(key => {
                if(this.statusFlag[key])
                    statusToFind.push(key)
            })
            this.projetoDataService
            .getProjetosPorVariosStatus(statusToFind, pageSize, pageIndex)
            .subscribe((res: any) => {
                this.dataSource = new MatTableDataSource(res.projetos);
                this.dataSource.sort = this.sort;
                this.buildPagination(res.links, res.meta)   
            });
        } else {
            this.projetoDataService
            .getProjetosPorVariosStatus(["ENVIADO", "ENTREGUE", "INSTALADO", "ATIVADO", "CANCELADO"], pageSize, pageIndex)
            .subscribe((res: any) => {
                this.dataSource = new MatTableDataSource(res.projetos);
                this.dataSource.sort = this.sort;
                this.buildPagination(res.links, res.meta)
            });
            
        }
        
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

    canEdit(projeto: Projeto) {
        return projeto.status == "PLANEJAMENTO";
    }

    canCancelProject(projeto: Projeto) {
        return projeto.status != "CANCELADO" && this.isAdmin;
    }

    get exibeTvEscola() {
        let usuarioAutenticado = this.authService.getCurrentUser();
        let classe = usuarioAutenticado.unidade.classe;
        return classe == "admin" || classe == "tvescola";
    }

    newPaginationEvent(pageEvent: PageEvent) {
        this.fetchProjetos(pageEvent.pageSize, pageEvent.pageIndex + 1)
    }

    get isAdmin() {
        let usuarioAutenticado = this.authService.getCurrentUser();
        let classe = usuarioAutenticado.unidade.classe;
        return classe == "admin" || classe == "tvescola" || classe == "mec";
    }

    toogleStatus(status: string) {
        this.statusFlag[status] = !this.statusFlag[status]
        this.fetchProjetos(this.INITIAL_PAGE_SIZE, this.INITIAL_PAGE_INDEX)
    }

    isStatusActive(status: string) {
        return this.statusFlag[status]?"active": ""
    }

    toogleBuscaAvancada() {
        this.buscaAvancada = !this.buscaAvancada
    }
    
    onBuscaAvancada() {
        
    }
}
