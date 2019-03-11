import { Component, OnInit } from '@angular/core';
import { EstadoDataService } from '../_shared/services/estado-data.service';
import { UnidadeDataService } from '../_shared/services/unidade-data.service';
import { SnackBarService } from '../_shared/helpers/snackbar.service';
import { UsuarioDataService } from '../_shared/services/usuario-data.service';
import { AuthService } from '../_shared/services/auth.service';

@Component({
    selector: 'app-tvescola',
    templateUrl: './tvescola.component.html',
    styleUrls: ['./tvescola.component.scss'],
    providers: [EstadoDataService, UnidadeDataService, SnackBarService, UsuarioDataService, AuthService]
})
export class TvEscolaComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
