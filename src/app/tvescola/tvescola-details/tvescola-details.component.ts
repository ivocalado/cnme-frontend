import { Component, OnInit, ViewChild  } from '@angular/core';
import { UnidadeDataService } from '../../_shared/services/unidade-data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Unidade } from '../../_shared/models/unidade.model';
import { Estado } from '../../_shared/models/estado.model';
import { Municipio } from '../../_shared/models/municipio.model';
import { Localidade } from '../../_shared/models/localidade.model';
import { MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { Usuario } from '../../_shared/models/usuario.model';
import {Location} from '@angular/common';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { UsuarioDataService } from 'src/app/_shared/services/usuario-data.service';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';


@Component({
    selector: 'app-tvescola-details',
    templateUrl: './tvescola-details.component.html',
    styleUrls: ['./tvescola-details.component.scss']
})
export class TvEscolaDetailsComponent implements OnInit {
    unidade: Unidade = Unidade.EMPTY_MODEL;
    @ViewChild(MatSort) sort: MatSort;

    //Estrutura de dados para exibição dos usuarios da unidade
    displayedColumns: string[] = ["nome", "email", "tipo", "actions"];
    dataSource;
    dataSourceInativos
    usuariosAtivos: boolean = true
    currentUser

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
        private unidadeDataService: UnidadeDataService,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private location: Location,
        private usuarioDataService: UsuarioDataService,
        private snackBarService: SnackBarService
        ) { }

    ngOnInit() {
        this.unidadeDataService.getTvEscola().subscribe((unidade: Unidade) => {
            this.unidade = unidade;
            this.currentUser = this.authService.getCurrentUser()
            this.fetchUsuarios(this.INITIAL_PAGE_SIZE, this.INITIAL_PAGE_INDEX)
        })
    }

    onCancel() {
        this.location.back()
    }

    onDelete(id: number) {
        if(confirm("Confirma a desativação do usuário?")) {
            this.usuarioDataService.deactivateUsuario(id, this.authService.getToken()).subscribe(res => {
                this.snackBarService.openSnackBar("Usuário desativado com sucesso!")
                this.fetchUsuarios(this.INITIAL_PAGE_SIZE, this.INITIAL_PAGE_INDEX)
            },
            error => {
                this.snackBarService.openSnackBar(error)
                this.router.navigate(['/'], { relativeTo: this.route });
            })
        }
    }

    isOwner(id_usuario: number) { 
        return this.unidade.responsavel.id == id_usuario
    }

    onReactivate(id: number) {
        if(confirm("Confirma a reativação do usuário?")) {
            this.usuarioDataService.reactivateUsuario(id, this.authService.getToken()).subscribe(res => {
                this.snackBarService.openSnackBar("Usuário reativado com sucesso!")
                this.fetchUsuarios(this.INITIAL_PAGE_SIZE, this.INITIAL_PAGE_INDEX)
            },
            error => {
                this.snackBarService.openSnackBar(error)
                this.router.navigate(['/'], { relativeTo: this.route });
            })
        }
    }

    get hasPermission() {
        let usuario = <Usuario>this.authService.getCurrentUser()
        let classe = usuario.unidade.classe 
        return classe == "admin" || (classe == "tvescola" && usuario.tipo == "gestor")
    }

    fetchUsuarios(pageSize: number, pageIndex: number) {
        if(this.usuariosAtivos) {
            this.unidadeDataService.getUsuariosAtivosByUnidade(this.unidade.id, pageSize, pageIndex).subscribe((res: any)  => {
                this.dataSource = new MatTableDataSource(res.usuarios);
                this.dataSource.sort = this.sort;
                this.buildPagination(res.links, res.meta)
            })
    
        } else {
            this.unidadeDataService.getUsuariosInativosByUnidade(this.unidade.id, pageSize, pageIndex).subscribe((res: any)  => {
                this.dataSourceInativos = new MatTableDataSource(res.usuarios);
                this.dataSource.sort = this.sort;
                this.buildPagination(res.links, res.meta)
            })
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

    newPaginationEvent(pageEvent: PageEvent) {
        this.fetchUsuarios(pageEvent.pageSize, pageEvent.pageIndex + 1)
    }


    applyFilter(dt: any, filterValue: string) {
        dt.filter = filterValue.trim().toLowerCase();
    }

    onInvitation() {
        this.router.navigate(['/tvescola/convidar'], { relativeTo: this.route });
    }

    onEdit() {
        this.router.navigate(['/tvescola/editar'], { relativeTo: this.route });
    }

    toogleUsuarios() {
        this.usuariosAtivos = !this.usuariosAtivos
        this.fetchUsuarios(this.INITIAL_PAGE_SIZE, this.INITIAL_PAGE_INDEX)
    }

    onDetails(id:number){
        this.router.navigate(['/usuarios/detalhes', id], { relativeTo: this.route });
    }
}
