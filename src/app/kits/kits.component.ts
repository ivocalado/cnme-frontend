import { Component, OnInit } from '@angular/core';
import { EstadoDataService } from '../_shared/services/estado-data.service';
import { KitDataService } from "../_shared/services/kit-data.service";
import { SnackBarService } from '../_shared/helpers/snackbar.service';


@Component({
    selector: 'app-kits',
    templateUrl: './kits.component.html',
    styleUrls: ['./kits.component.scss'],
    providers: [EstadoDataService, KitDataService, SnackBarService]
})
export class KitsComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
