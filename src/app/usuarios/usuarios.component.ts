import { Component, OnInit } from '@angular/core';
import { SnackBarService } from '../_shared/helpers/snackbar.service';
import { UnidadeDataService } from '../_shared/services/unidade-data.service';
import {UsuarioDataService} from '../_shared/services/usuario-data.service'
import { AuthService } from '../_shared/services/auth.service';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss'],
    providers: [SnackBarService, UsuarioDataService, AuthService, UnidadeDataService]
})
export class UsuariosComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
