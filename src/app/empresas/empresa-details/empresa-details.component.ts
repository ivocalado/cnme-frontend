import { Component, OnInit, ViewChild } from '@angular/core';
import { Estado } from '../../_shared/models/estado.model';
import { Unidade } from '../../_shared/models/unidade.model';
import { UnidadeDataService } from '../../_shared/services/unidade-data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/_shared/services/auth.service';
import {Location} from '@angular/common';

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
        private router: Router,
        private authService: AuthService,
        private location: Location
    ) { }

    ngOnInit() {
        if(!this.canProcess()) {
            this.router.navigate(['/'], { relativeTo: this.route });
            return
        }
        this.route.params.subscribe((params: Params) => {
            const unidadeId = +params["id"];
            this.unidadeDataService.getUnidade(unidadeId).subscribe((unidade: Unidade) => {
                this.unidade = unidade;
            })
        })
    }

    onCancel() {
        this.location.back()
    }

    private canProcess() {
        return false
    }
    
}
