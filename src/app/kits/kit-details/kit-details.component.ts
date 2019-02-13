import { Component, OnInit, ViewChild} from '@angular/core';
import { KitDataService } from '../../_shared/services/kit-data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Kit } from '../../_shared/models/kit.model';
import { EquipamentoDataService } from '../../_shared/services/equipamento-data.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Equipamento } from '../../_shared/models/equipamento.model';

@Component({
    selector: 'app-kit-details',
    templateUrl: './kit-details.component.html',
    styleUrls: ['./kit-details.component.scss']
})
export class KitDetailsComponent implements OnInit {
    kit: Kit = Kit.EMPTY_MODEL;
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ['nome', 'descricao', 'requisitos'];
    dataSource;
    equipamentos: Equipamento[];

    constructor(
        private kitDataService: KitDataService,
        private route:ActivatedRoute,
        private equipamentoDataService: EquipamentoDataService,
        private router:Router
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params:Params) =>{
            const kitId = +params["id"];
            this.kitDataService.getKit(kitId).subscribe((kit:Kit) =>{
                this.kit = kit;
                this.dataSource = new MatTableDataSource(kit.equipamentos);
                this.dataSource.sort = this.sort;
             })
        })
    }
    onCancel(){
        this.router.navigate(['/kits'], {relativeTo:this.route});
    }

}
