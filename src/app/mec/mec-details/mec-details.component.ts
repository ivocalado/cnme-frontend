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

    constructor(
        private unidadeDataService: UnidadeDataService,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private location: Location
        ) { }

    ngOnInit() {
        this.unidadeDataService.getMec().subscribe((unidade: Unidade) => {
            this.unidade = unidade;
            this.fetchUsuarios()
        })
    }

    onCancel() {
        this.location.back()
    }
    fetchUsuarios() {
        this.unidadeDataService.getUsuariosByUnidade(this.unidade.id).subscribe((usuarios:Usuario[])  => {
            this.dataSource = new MatTableDataSource(usuarios);
            this.dataSource.sort = this.sort;
        })
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    onInvitation() {
        this.router.navigate(['/mec/convidar'], { relativeTo: this.route });
    }

    onEdit() {
        this.router.navigate(['/mec/editar'], { relativeTo: this.route });
    }

    get temPermissao() {
        let usuario = <Usuario>this.authService.getCurrentUser()

        return usuario.unidade.classe == "admin" || usuario.tipo == "gestor"
    }
}
