import { Component, OnInit } from '@angular/core';
import { EquipamentoDataService } from 'src/app/_shared/services/equipamento-data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Equipamento } from 'src/app/_shared/models/equipamento.model';
import { TipoEquipamento } from 'src/app/_shared/models/tipoEquipamento.model';

@Component({
    selector: 'app-equipamento-details',
    templateUrl: './equipamento-details.component.html',
    styleUrls: ['./equipamento-details.component.scss']
})
export class EquipamentoDetailsComponent implements OnInit {
    tipoEquipamento: TipoEquipamento = new TipoEquipamento(null, "", "")
    equipamento: Equipamento = new Equipamento("", "", "", "", "", this.tipoEquipamento, this.tipoEquipamento.id);

    constructor(
        private equipamentoDataService: EquipamentoDataService,
        private route:ActivatedRoute,
        private router:Router
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
        this.router.navigate(['/equipamentos'], {relativeTo:this.route});
    }

}
