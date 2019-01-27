import { Component, OnInit } from '@angular/core';
import { EstadoDataService } from '../shared/services/estado-data.service';
import { UnidadeDataService } from "../shared/services/unidade-data.service";

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss'],
  providers:[EstadoDataService, UnidadeDataService]
})
export class UnidadesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
