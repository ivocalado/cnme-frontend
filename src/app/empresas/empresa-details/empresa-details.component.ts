import { Component, OnInit, ViewChild } from '@angular/core';
import { Estado } from '../../_shared/models/estado.model';
import { Localidade } from '../../_shared/models/localidade.model';
import { Unidade } from '../../_shared/models/unidade.model';
import { Municipio } from '../../_shared/models/municipio.model';
import { UnidadeDataService } from '../../_shared/services/unidade-data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
    selector: 'app-empresa-details',
    templateUrl: './empresa-details.component.html',
    styleUrls: ['./empresa-details.component.scss']
})
export class EmpresaDetailsComponent implements OnInit {
    estado: Estado = new Estado(null, "", "")
    unidade: Unidade = Unidade.EMPTY_MODEL;


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
            })
        })
    }

    onCancel() {
        this.router.navigate(['/empresas'], { relativeTo: this.route });
    }
}
