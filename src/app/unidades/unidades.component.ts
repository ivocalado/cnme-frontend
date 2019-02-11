import { Component, OnInit } from '@angular/core';
import { EstadoDataService } from '../_shared/services/estado-data.service';
import { UnidadeDataService } from "../_shared/services/unidade-data.service";
import { SnackBarService } from '../_shared/helpers/snackbar.service';


@Component({
    selector: 'app-unidades',
    templateUrl: './unidades.component.html',
    styleUrls: ['./unidades.component.scss'],
    providers: [EstadoDataService, UnidadeDataService, SnackBarService]
})
export class UnidadesComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}