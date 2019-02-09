import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipamento } from 'src/app/_shared/models/equipamento.model';
import { EquipamentoDataService } from 'src/app/_shared/services/equipamento-data.service';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
    selector: "app-equipamento-list",
    templateUrl: "./equipamento-list.component.html",
    styleUrls: ["./equipamento-list.component.scss"]
})
export class EquipamentoListComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ["nome", "tipoEquipamento", "descricao", "requisitos", "actions"];
    dataSource;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private equipamentoDataService: EquipamentoDataService
    ) {}

    ngOnInit() {
        this.fetchEquipamentos();
    }

    onEdit(id: number) {
        this.router.navigate(["editar", id], { relativeTo: this.route });
    }

    onDetails(id:Number){
        this.router.navigate(['detalhes', id], { relativeTo: this.route });
    }

    onDelete(id: number) {
        if (confirm("Tem certeza que deseja deletar esta equipamento")) {
            this.equipamentoDataService.deleteEquipamento(id).subscribe(res => {
                this.fetchEquipamentos();
            });
        }
    }

    fetchEquipamentos() {
        this.equipamentoDataService
            .getEquipamentos()
            .subscribe((equipamentos: Equipamento[]) => {
                this.dataSource = new MatTableDataSource(equipamentos);
                this.dataSource.sort = this.sort;
            });
    }
}
