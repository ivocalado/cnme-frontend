import { Component, OnInit } from '@angular/core';
import { EquipamentoDataService } from '../../_shared/services/equipamento-data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Equipamento } from '../../_shared/models/equipamento.model';
import { TipoEquipamento } from '../../_shared/models/tipoEquipamento.model';
import {Location} from '@angular/common';

@Component({
    selector: 'app-equipamento-details',
    templateUrl: './equipamento-details.component.html',
    styleUrls: ['./equipamento-details.component.scss']
})
export class EquipamentoDetailsComponent implements OnInit {
    //tipoEquipamento: TipoEquipamento = new TipoEquipamento(null, "", "")
    equipamento: Equipamento = Equipamento.EMPTY_MODEL;

    constructor(
        private equipamentoDataService: EquipamentoDataService,
        private route:ActivatedRoute,
        private router:Router,
        private location: Location
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params:Params) =>{
            const equipamentoId = +params["id"];
            this.equipamentoDataService.getEquipamento(equipamentoId).subscribe((equipamento:Equipamento) =>{
                this.equipamento = equipamento;
            })
        })
    }
    onCancel(){
        this.location.back()
    }

}
