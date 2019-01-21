import { Component, OnInit } from '@angular/core';
import { EstadoDataService } from '../shared/estado-data.service';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss'],
  providers:[EstadoDataService]
})
export class UnidadesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
