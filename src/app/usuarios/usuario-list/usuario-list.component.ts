import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';
import { Usuario } from 'src/app/_shared/models/usuario.model';

const lstUsers: Usuario[] =[
    { id: 1, nome: "Raynner", email: "r@m.com", password: "123", cpf: "000.000.000-00", unidade_id: 1, tipo: "Admin" },
    { id: 2, nome: "Ivo", email: "r@m.com", password: "123", cpf: "000.000.000-00", unidade_id: 1, tipo: "Admin" },
    { id: 3, nome: "Thiago", email: "r@m.com", password: "123", cpf: "000.000.000-00", unidade_id: 1, tipo: "Admin" },
    { id: 4, nome: "DM", email: "r@m.com", password: "123", cpf: "000.000.000-00", unidade_id: 1, tipo: "Admin" },
    { id: 5, nome: "Wilmax", email: "r@m.com", password: "123", cpf: "000.000.000-00", unidade_id: 1, tipo: "Admin" },
    { id: 6, nome: "Davi", email: "r@m.com", password: "123", cpf: "000.000.000-00", unidade_id: 1, tipo: "Admin" }
]


@Component({
    selector: "app-usuario-list",
    templateUrl: "./usuario-list.component.html",
    styleUrls: ["./usuario-list.component.scss"]
})
export class UsuarioListComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ["nome", "email", "actions"];
    dataSource = lstUsers;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private snackBarService: SnackBarService
    ) {}

    ngOnInit() {}

    onEdit(id: number) {
        this.router.navigate(["editar", id], { relativeTo: this.route });
    }

    onDelete(id: number) {
        this.snackBarService.openSnackBar("implantar método para deletar");
    }

    fetchUnidades() {}
}
