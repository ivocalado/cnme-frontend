import { Component, OnInit } from '@angular/core';
import { KitDataService } from "../_shared/services/kit-data.service";
import { SnackBarService } from '../_shared/helpers/snackbar.service';
import {EquipamentoDataService} from "../_shared/services/equipamento-data.service"


@Component({
    selector: 'app-kits',
    templateUrl: './kits.component.html',
    styleUrls: ['./kits.component.scss'],
    providers: [KitDataService, SnackBarService, EquipamentoDataService]
})
export class KitsComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
