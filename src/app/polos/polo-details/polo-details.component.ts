import { Component, OnInit, ViewChild  } from '@angular/core';
import { UnidadeDataService } from '../../_shared/services/unidade-data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Unidade } from '../../_shared/models/unidade.model';
import { Estado } from '../../_shared/models/estado.model';
import { Municipio } from '../../_shared/models/municipio.model';
import { Localidade } from '../../_shared/models/localidade.model';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Usuario } from '../../_shared/models/usuario.model';


@Component({
    selector: 'app-polo-details',
    templateUrl: './polo-details.component.html',
    styleUrls: ['./polo-details.component.scss']
})
export class PoloDetailsComponent implements OnInit {
    unidade: Unidade = Unidade.EMPTY_MODEL;
    @ViewChild(MatSort) sort: MatSort;

    //Estrutura de dados para exibição dos usuarios da unidade
    displayedColumns: string[] = ["nome", "email", "tipo", "actions"];
    dataSource;

    constructor(
        private unidadeDataService: UnidadeDataService,
        private route: ActivatedRoute,
        private router: Router) { }

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
        this.router.navigate(['/polos'], { relativeTo: this.route });
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
        console.log("ID = " + unidade_id)
        this.router.navigate(['convidar', unidade_id], { relativeTo: this.route });
    }
}
