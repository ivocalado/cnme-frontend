import { Component, OnInit } from '@angular/core';
import { EstadoDataService } from '../_shared/services/estado-data.service';
import { EquipamentoDataService } from "../_shared/services/equipamento-data.service";
import { SnackBarService } from '../_shared/helpers/snackbar.service';


@Component({
    selector: 'app-equipamentos',
    templateUrl: './equipamentos.component.html',
    styleUrls: ['./equipamentos.component.scss'],
    providers: [EstadoDataService, EquipamentoDataService, SnackBarService]
})
export class EquipamentosComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
