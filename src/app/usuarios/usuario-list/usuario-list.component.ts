import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '../../_shared/helpers/snackbar.service';
import { Usuario } from '../../_shared/models/usuario.model';
import { UnidadeDataService } from '../../_shared/services/unidade-data.service';
import { UsuarioDataService } from '../../_shared/services/usuario-data.service';
import { AuthService } from 'src/app/_shared/services/auth.service';


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
        private authService: AuthService,
        private unidadeDataService: UnidadeDataService,
        private usuarioDataService: UsuarioDataService
    ) {}

    ngOnInit() {
        this.usuarioAutenticado = this.authService.getCurrentUser()
        this.fetchUsuarios()
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

    fetchUsuarios() {
        this.unidadeDataService.getUnidade(this.usuarioAutenticado.unidade_id).subscribe(unidade => {
            this.unidadeDataService.getUsuariosAtivosByUnidade(this.usuarioAutenticado.id).subscribe((usuarios:Usuario[])  => {
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
