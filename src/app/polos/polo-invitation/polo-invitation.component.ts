import { Component, OnInit, ViewChild  } from '@angular/core';
import { UnidadeDataService } from '../../_shared/services/unidade-data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Unidade } from '../../_shared/models/unidade.model';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Usuario } from '../../_shared/models/usuario.model';


@Component({
    selector: 'app-polo-invitation',
    templateUrl: './polo-invitation.component.html',
    styleUrls: ['./polo-invitation.component.scss']
})
export class PoloInvitationComponent implements OnInit {
    unidade: Unidade = Unidade.EMPTY_MODEL;
    
    constructor(
        private unidadeDataService: UnidadeDataService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
            console.log("ngOnInit")
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
