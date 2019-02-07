import { Component, OnInit } from '@angular/core';
import { TipoEquipamentoDataService } from "../_shared/services/tipoEquipamento-data.service";
import { SnackBarService } from '../_shared/helpers/snackbar.service';


@Component({
    selector: 'app-tipoEquipamentos',
    templateUrl: './tipoEquipamentos.component.html',
    styleUrls: ['./tipoEquipamentos.component.scss'],
    providers: [TipoEquipamentoDataService, SnackBarService]
})
export class TipoEquipamentosComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
