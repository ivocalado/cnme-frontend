import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '../../_shared/helpers/snackbar.service';
import { AuthenticationDataService } from '../../_shared/services/authentication-data.service';
import { Usuario } from '../../_shared/models/usuario.model';
import { UnidadeDataService } from '../../_shared/services/unidade-data.service';


@Component({
    selector: "app-usuario-list",
    templateUrl: "./usuario-list.component.html",
    styleUrls: ["./usuario-list.component.scss"]
})
export class UsuarioListComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;

    //Estrutura de dados para exibição dos usuarios da unidade
    displayedColumns: string[] = ["nome", "email", "tipo", "actions"];
    dataSource;


    usuarioAutenticado: Usuario; 

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private snackBarService: SnackBarService,
        private authenticationDataService: AuthenticationDataService,
        private unidadeDataService: UnidadeDataService
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
                this.dataSource = new MatTableDataSource(usuarios);
                this.dataSource.sort = this.sort;
            })
        })
    }
}
