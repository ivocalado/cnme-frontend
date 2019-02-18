import { Component, OnInit, ViewChild } from '@angular/core';
import { Estado } from '../../_shared/models/estado.model';
import { Localidade } from '../../_shared/models/localidade.model';
import { Unidade } from '../../_shared/models/unidade.model';
import { Municipio } from '../../_shared/models/municipio.model';
import { UnidadeDataService } from '../../_shared/services/unidade-data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Usuario } from '../../_shared/models/usuario.model';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-empresa-details',
    templateUrl: './empresa-details.component.html',
    styleUrls: ['./empresa-details.component.scss']
})
export class EmpresaDetailsComponent implements OnInit {
    estado: Estado = new Estado(null, "", "")
    unidade: Unidade = Unidade.EMPTY_MODEL;

    @ViewChild(MatSort) sort: MatSort;

    //Estrutura de dados para exibição dos usuarios da unidade
    displayedColumns: string[] = ["nome", "email", "tipo", "actions"];
    dataSource;

    constructor(
        private unidadeDataService: UnidadeDataService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            const unidadeId = +params["id"];
            this.unidadeDataService.getUnidade(unidadeId).subscribe((unidade: Unidade) => {
                this.unidade = unidade;
                this.fetchUsuarios()
            })
        })
    }

    onCancel() {
        this.router.navigate(['/unidades'], { relativeTo: this.route });
    }

    fetchUsuarios() {
        this.unidadeDataService.getUsuariosByUnidade(this.unidade.id).subscribe((usuarios:Usuario[])  => {
            this.dataSource = new MatTableDataSource(usuarios);
            this.dataSource.sort = this.sort;
        })
    }

}
