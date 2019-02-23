import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '../../_shared/helpers/snackbar.service';
import { AuthenticationDataService } from '../../_shared/services/authentication-data.service';
import { Usuario } from '../../_shared/models/usuario.model';
import { UnidadeDataService } from '../../_shared/services/unidade-data.service';
import { UsuarioDataService } from '../../_shared/services/usuario-data.service';


@Component({
    selector: "app-usuario-list",
    templateUrl: "./usuario-list.component.html",
    styleUrls: ["./usuario-list.component.scss"]
})
export class UsuarioListComponent implements OnInit {
    @ViewChild(MatSort) sortUnidade: MatSort;

    //Estrutura de dados para exibição dos usuarios da unidade
    displayedColumnsUnidade: string[] = ["nome", "email", "tipo", "actions"];
    dataSourceUnidade;

 

    usuarioAutenticado: Usuario; 
    usuariosUnidade: Usuario[]



    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private snackBarService: SnackBarService,
        private authenticationDataService: AuthenticationDataService,
        private unidadeDataService: UnidadeDataService,
        private usuarioDataService: UsuarioDataService
    ) {}

    ngOnInit() {
        this.authenticationDataService.getSessionUser().subscribe(user => {
            this.usuarioAutenticado = user
            this.fetchUsuarios()
        })
        
    }

    onEdit(id: number) {
        this.router.navigate(["editar", id], { relativeTo: this.route });
    }

    onDelete(id: number) {
        this.snackBarService.openSnackBar("implantar método para deletar");
    }

    fetchUsuarios() {
        this.unidadeDataService.getUnidade(this.usuarioAutenticado.unidade_id).subscribe(unidade => {
            this.unidadeDataService.getUsuariosByUnidade(this.usuarioAutenticado.id).subscribe((usuarios:Usuario[])  => {
                console.log(usuarios)
                this.usuariosUnidade= usuarios
                this.dataSourceUnidade = new MatTableDataSource(usuarios);
                this.dataSourceUnidade.sort = this.sortUnidade;
            })
        })
    }

    applyFilter(filterValue: string) {
        this.dataSourceUnidade.filter = filterValue.trim().toLowerCase();
    }
}
