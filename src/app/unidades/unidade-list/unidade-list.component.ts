import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Unidade } from 'src/app/shared/models/unidade.model';
import { UnidadeDataService } from 'src/app/shared/services/unidade-data.service';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
    selector: "app-unidade-list",
    templateUrl: "./unidade-list.component.html",
    styleUrls: ["./unidade-list.component.scss"]
})
export class UnidadeListComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ["nome", "tipo", "estado", "actions"];
    dataSource;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private unidadeDataService: UnidadeDataService
    ) {}

    ngOnInit() {
        this.fetchUnidades();
    }

    onEdit(id: number) {
        this.router.navigate(["editar", id], { relativeTo: this.route });
    }

    onDelete(id: number) {
        if (confirm("Tem certeza que deseja deletar esta unidade")) {
            this.unidadeDataService.deleteUnidade(id).subscribe(res => {
                this.fetchUnidades();
            });
        }
    }

    fetchUnidades() {
        this.unidadeDataService
            .getUnidades()
            .subscribe((unidades: Unidade[]) => {
                this.dataSource = new MatTableDataSource(unidades);
                this.dataSource.sort = this.sort;
            });
    }
}
