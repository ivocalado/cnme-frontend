import { Component, OnInit } from '@angular/core';
import { EstadoDataService } from '../_shared/services/estado-data.service';
import { UnidadeDataService } from '../_shared/services/unidade-data.service';
import { SnackBarService } from '../_shared/helpers/snackbar.service';

@Component({
    selector: 'app-polos',
    templateUrl: './polos.component.html',
    styleUrls: ['./polos.component.scss'],
    providers: [EstadoDataService, UnidadeDataService, SnackBarService]
})
export class PolosComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
