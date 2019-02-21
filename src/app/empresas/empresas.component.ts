import { Component, OnInit } from '@angular/core';
import { EstadoDataService } from '../_shared/services/estado-data.service';
import { UnidadeDataService } from '../_shared/services/unidade-data.service';
import { SnackBarService } from '../_shared/helpers/snackbar.service';
import { AuthenticationDataService } from '../_shared/services/authentication-data.service';

@Component({
    selector: "app-empresas",
    templateUrl: "./empresas.component.html",
    styleUrls: ["./empresas.component.scss"],
    providers: [EstadoDataService, UnidadeDataService, SnackBarService, AuthenticationDataService]
})
export class EmpresasComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
