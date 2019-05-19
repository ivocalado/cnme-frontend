import { Component, OnInit, ViewChild} from '@angular/core';
import { ProjetoDataService } from 'src/app/_shared/services/projeto-data.service';
import { Projeto } from 'src/app/_shared/models/projeto.model';
import { MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: "app-projeto-list",
    templateUrl: "./projeto-list.component.html",
    styleUrls: ["./projeto-list.component.scss"]
})
export class ProjetoListComponent implements OnInit {
    estados: any[] = [
        {estado: "Acre", sigla: "AC"},
        {estado: "Alagoas", sigla: "AL"},
        {estado: "Amapá", sigla: "AP"},
        {estado: "Amazonas", sigla: "AM"},
        {estado: "Bahia", sigla: "BA"},
        {estado: "Ceará", sigla: "CE"},
        {estado: "Distrito Federal", sigla: "DF"},
        {estado: "Espírito Santo", sigla: "ES"},
        {estado: "Goiás", sigla: "GO"},
        {estado: "MAranhão", sigla: "MA"},
        {estado: "Mato Gross", sigla: "MT"},
        {estado: "Mato Grosso do Sul", sigla: "MS"},
        {estado: "Minas Gerais", sigla: "MG"},
        {estado: "Pará", sigla: "PA"},
        {estado: "Paraíba", sigla: "PB"},
        {estado: "Paraná", sigla: "PR"},
        {estado: "Pernambuco", sigla: "PE"},
        {estado: "Piauí", sigla: "PI"},
        {estado: "Rio de Janeiro", sigla: "RJ"},
        {estado: "Rio Grande do Norte", sigla: "RN"},
        {estado: "Rio Grande do Sul", sigla: "RS"},
        {estado: "Rondônia", sigla: "RO"},
        {estado: "Roraima", sigla: "RR"},
        {estado: "Santa Catarina", sigla: "SC"},
        {estado: "São Paulo", sigla: "SP"},
        {estado: "Sergipe", sigla: "SE"},
        {estado: "Tocantinhs", sigla: "TO"},        
    ]
    
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

    statusNames = [
        "PLANEJAMENTO",
        "ENVIADO",
        "ENTREGUE",
        "INSTALADO",
        "ATIVADO",
        "CANCELADO"
    ]

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
    buscaAvancadaForm: FormGroup;

    ngOnInit() {
        this.initForm()
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
        if(this.buscaAvancada) {
            this.projetoDataService.getProjetosComFiltros(this.buscaAvancadaForm.value, pageSize, pageIndex)
            .subscribe((res: any) => {
                this.dataSource = new MatTableDataSource(res.projetos);
                this.dataSource.sort = this.sort;
                this.buildPagination(res.links, res.meta)
            });

        } else {
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
        if(this.buscaAvancada)
            return
        this.statusFlag[status] = !this.statusFlag[status]
        this.fetchProjetos(this.INITIAL_PAGE_SIZE, this.INITIAL_PAGE_INDEX)
    }

    isStatusActive(status: string) {
        return this.statusFlag[status]? "active": "";
    }

    toogleBuscaAvancada() {
        this.buscaAvancada = !this.buscaAvancada
    }
    
    onBuscaAvancada() {
        this.fetchProjetos(this.INITIAL_PAGE_SIZE, this.INITIAL_PAGE_INDEX)
    }

    initForm() {
        this.buscaAvancadaForm = new FormGroup({
            q: new FormControl({value: '', disabled: true}),
            uf: new FormControl({value: '', disabled: true}),
            status: new FormControl({value: '', disabled: true})
        })
    }

    isSearchValid() {
        let controls = ['q', 'uf', 'status']
        let result : boolean = false
        for(let control of controls) {
            let ct = this.buscaAvancadaForm.controls[control]
            if(ct.status == "VALID" && ct.value && ct.value.trim() != "")
                result = true
            if(ct.status == "VALID" && (!ct.value || ct.value.trim() == ""))
                return false
        }
        return result
    }

    toogleEvent(event: string, status: boolean) {
        if(status) 
            this.buscaAvancadaForm.controls[event].enable()
        else 
            this.buscaAvancadaForm.controls[event].disable()
    }

    get isPolo() {
        return this.authService.getCurrentUser().unidade.classe == "polo"
    }
}
