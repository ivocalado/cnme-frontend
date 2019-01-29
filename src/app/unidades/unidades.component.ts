import { Component, OnInit } from '@angular/core';
import { EstadoDataService } from '../shared/services/estado-data.service';
import { UnidadeDataService } from "../shared/services/unidade-data.service";
import { SnackBarService } from '../shared/helpers/snakbar.service';


@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss'],
    providers: [EstadoDataService, UnidadeDataService, SnackBarService]
})
export class UnidadesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
