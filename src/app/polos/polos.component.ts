import { Component, OnInit } from '@angular/core';
import { EstadoDataService } from '../_shared/services/estado-data.service';
import { UnidadeDataService } from '../_shared/services/unidade-data.service';
import { SnackBarService } from '../_shared/helpers/snackbar.service';
import { UsuarioDataService } from '../_shared/services/usuario-data.service';

@Component({
    selector: 'app-polos',
    templateUrl: './polos.component.html',
    styleUrls: ['./polos.component.scss'],
    providers: [EstadoDataService, UnidadeDataService, SnackBarService, UsuarioDataService]
})
export class PolosComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
