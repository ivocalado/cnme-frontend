import { Component, OnInit } from '@angular/core';
import { SnackBarService } from '../_shared/helpers/snackbar.service';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss'],
    providers: [UsuariosComponent, SnackBarService]
})
export class UsuariosComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
