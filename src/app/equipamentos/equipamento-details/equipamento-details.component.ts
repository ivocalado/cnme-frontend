import { Component, OnInit } from '@angular/core';
import { EquipamentoDataService } from 'src/app/_shared/services/equipamento-data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Equipamento } from 'src/app/_shared/models/equipamento.model';
import { Estado } from 'src/app/_shared/models/estado.model';
import { Municipio } from 'src/app/_shared/models/municipio.model';
import { Localidade } from 'src/app/_shared/models/localidade.model';

@Component({
    selector: 'app-equipamento-details',
    templateUrl: './equipamento-details.component.html',
    styleUrls: ['./equipamento-details.component.scss']
})
export class EquipamentoDetailsComponent implements OnInit {
    estado: Estado = new Estado(null, "", "")
    municipio: Municipio = new Municipio(null, "", null);
    localidade: Localidade = new Localidade("", "", "", "", "", "", null, null, this.estado, this.municipio);
    equipamento: Equipamento = new Equipamento("", "", "", "", "", "", "", null, this.localidade);

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
