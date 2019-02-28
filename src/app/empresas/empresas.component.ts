import { Component, OnInit } from '@angular/core';
import { EstadoDataService } from '../_shared/services/estado-data.service';
import { UnidadeDataService } from '../_shared/services/unidade-data.service';
import { SnackBarService } from '../_shared/helpers/snackbar.service';
import { AuthService } from '../_shared/services/auth.service';

@Component({
    selector: "app-empresas",
    templateUrl: "./empresas.component.html",
    styleUrls: ["./empresas.component.scss"],
    providers: [EstadoDataService, UnidadeDataService, SnackBarService, AuthService]
})
export class EmpresasComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
