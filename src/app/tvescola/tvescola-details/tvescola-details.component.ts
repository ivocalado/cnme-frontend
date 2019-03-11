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

    constructor(
        private unidadeDataService: UnidadeDataService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
        ) { }

    ngOnInit() {
        this.unidadeDataService.getTvEscola().subscribe((unidade: Unidade) => {
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

    onInvitation(unidade_id: number) {
        this.router.navigate(['/tvescola/convidar'], { relativeTo: this.route });
    }
}
