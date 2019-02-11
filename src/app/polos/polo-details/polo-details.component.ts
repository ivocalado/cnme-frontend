import { Component, OnInit } from '@angular/core';
import { UnidadeDataService } from 'src/app/_shared/services/unidade-data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Unidade } from 'src/app/_shared/models/unidade.model';
import { Estado } from 'src/app/_shared/models/estado.model';
import { Municipio } from 'src/app/_shared/models/municipio.model';
import { Localidade } from 'src/app/_shared/models/localidade.model';

@Component({
    selector: 'app-polo-details',
    templateUrl: './polo-details.component.html',
    styleUrls: ['./polo-details.component.scss']
})
export class PoloDetailsComponent implements OnInit {
    unidade: Unidade = Unidade.EMPTY_MODEL;
    constructor(
        private unidadeDataService: UnidadeDataService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            const unidadeId = +params["id"];
            this.unidadeDataService.getUnidade(unidadeId).subscribe((unidade: Unidade) => {
                this.unidade = unidade;
            })
        })
    }

    onCancel() {
        this.router.navigate(['/polos'], { relativeTo: this.route });
    }

}
