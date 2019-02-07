import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoEquipamento } from 'src/app/_shared/models/tipoEquipamento.model';
import { TipoEquipamentoDataService } from 'src/app/_shared/services/tipoEquipamento-data.service';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
    selector: "app-tipoEquipamento-list",
    templateUrl: "./tipoEquipamento-list.component.html",
    styleUrls: ["./tipoEquipamento-list.component.scss"]
})
export class TipoEquipamentoListComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ["nome", "descricao", "actions"];
    dataSource;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private tipoEquipamentoDataService: TipoEquipamentoDataService
    ) {}

    ngOnInit() {
        this.fetchTipoEquipamentos();
    }

    onEdit(id: number) {
        this.router.navigate(["editar", id], { relativeTo: this.route });
    }

    onDetails(id:Number){
        this.router.navigate(['detalhes', id], { relativeTo: this.route });
    }

    onDelete(id: number) {
    	console.log("passou aquiiii");
        if (confirm("Tem certeza que deseja deletar este tipo de equipamento")) {
            this.tipoEquipamentoDataService.deleteTipoEquipamento(id).subscribe(res => {
                this.fetchTipoEquipamentos();
            });
        }
    }

    fetchTipoEquipamentos() {
        this.tipoEquipamentoDataService
            .getTipoEquipamentos()
            .subscribe((tipoEquipamentos: TipoEquipamento[]) => {
                this.dataSource = new MatTableDataSource(tipoEquipamentos);
                this.dataSource.sort = this.sort;
            });
    }
}
