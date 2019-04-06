import { Component, OnInit, ViewChild  } from '@angular/core';
import { UnidadeDataService } from '../../_shared/services/unidade-data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Unidade } from '../../_shared/models/unidade.model';
import { Estado } from '../../_shared/models/estado.model';
import { Municipio } from '../../_shared/models/municipio.model';
import { Localidade } from '../../_shared/models/localidade.model';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Usuario } from '../../_shared/models/usuario.model';
import {Location} from '@angular/common';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { UsuarioDataService } from 'src/app/_shared/services/usuario-data.service';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';


@Component({
    selector: 'app-mec-details',
    templateUrl: './mec-details.component.html',
    styleUrls: ['./mec-details.component.scss']
})
export class MecDetailsComponent implements OnInit {
    unidade: Unidade = Unidade.EMPTY_MODEL;
    @ViewChild(MatSort) sort: MatSort;

    //Estrutura de dados para exibição dos usuarios da unidade
    displayedColumns: string[] = ["nome", "email", "tipo", "actions"];
    dataSource;
    dataSourceInativos
    usuariosAtivos: boolean = true
    currentUser


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
        this.unidadeDataService.getMec().subscribe((unidade: Unidade) => {
            this.unidade = unidade;
            this.currentUser = this.authService.getCurrentUser()
            this.fetchUsuarios()
        })
    }

    onCancel() {
        this.location.back()
    }
    fetchUsuarios() {
        this.unidadeDataService.getUsuariosAtivosByUnidade(this.unidade.id).subscribe((usuarios:Usuario[])  => {
            this.dataSource = new MatTableDataSource(usuarios);
            this.dataSource.sort = this.sort;
        })

        this.unidadeDataService.getUsuariosInativosByUnidade(this.unidade.id).subscribe((usuarios:Usuario[])  => {
            this.dataSourceInativos = new MatTableDataSource(usuarios);
            this.dataSource.sort = this.sort;
        })
    }

    applyFilter(dt: any, filterValue: string) {
        dt.filter = filterValue.trim().toLowerCase();
    }

    onInvitation() {
        this.router.navigate(['/mec/convidar'], { relativeTo: this.route });
    }

    onEdit() {
        this.router.navigate(['/mec/editar'], { relativeTo: this.route });
    }

    get hasPermission() {
        let usuario = <Usuario>this.authService.getCurrentUser()
        let classe = usuario.unidade.classe 
        return classe == "admin" || (classe == "mec" && usuario.tipo == "gestor")
    }

    onDelete(id: number) {
        if(confirm("Confirma a desativação do usuário?")) {
            this.usuarioDataService.deactivateUsuario(id, this.authService.getToken()).subscribe(res => {
                this.snackBarService.openSnackBar("Usuário desativado com sucesso!")
                this.fetchUsuarios()
            },
            error => {
                this.snackBarService.openSnackBar(error)
                this.router.navigate(['/'], { relativeTo: this.route });
            })
        }
    }

    onReactivate(id: number) {
        if(confirm("Confirma a reativação do usuário?")) {
            this.usuarioDataService.reactivateUsuario(id, this.authService.getToken()).subscribe(res => {
                this.snackBarService.openSnackBar("Usuário reativado com sucesso!")
                this.fetchUsuarios()
            },
            error => {
                this.snackBarService.openSnackBar(error)
                this.router.navigate(['/'], { relativeTo: this.route });
            })
        }
    }

    toogleUsuarios() {
        this.usuariosAtivos = !this.usuariosAtivos
    }

    onDetails(id:number){
        this.router.navigate(['/usuarios/detalhes', id], { relativeTo: this.route });
    }
}
