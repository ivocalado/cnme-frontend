import { Component, OnInit } from '@angular/core';
import { TipoEquipamentoDataService } from 'src/app/_shared/services/tipoEquipamento-data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TipoEquipamento } from 'src/app/_shared/models/tipoEquipamento.model';

@Component({
    selector: 'app-tipoEquipamento-details',
    templateUrl: './tipoEquipamento-details.component.html',
    styleUrls: ['./tipoEquipamento-details.component.scss']
})
export class TipoEquipamentoDetailsComponent implements OnInit {
    tipoEquipamento: TipoEquipamento = TipoEquipamento.EMPTY_MODEL;

    constructor(
        private tipoEquipamentoDataService: TipoEquipamentoDataService,
        private route:ActivatedRoute,
        private router:Router
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params:Params) =>{
            const tipoEquipamentoId = +params["id"];
            this.tipoEquipamentoDataService.getTipoEquipamento(tipoEquipamentoId).subscribe((tipoEquipamento:TipoEquipamento) =>{
                this.tipoEquipamento = tipoEquipamento;
            })
        })
    }
    onCancel(){
        this.router.navigate(['/tipoEquipamentos'], {relativeTo:this.route});
    }

}
