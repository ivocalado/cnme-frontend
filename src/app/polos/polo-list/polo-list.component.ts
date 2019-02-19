import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnidadeDataService } from 'src/app/_shared/services/unidade-data.service';
import { Unidade } from 'src/app/_shared/models/unidade.model';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
    selector: "app-polo-list",
    templateUrl: "./polo-list.component.html",
    styleUrls: ["./polo-list.component.scss"]
})
export class PoloListComponent implements OnInit {
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

    onDetails(id: number) {
        this.router.navigate(['detalhes', id], { relativeTo: this.route });
    }

    onDelete(id: number) {
        if (confirm("Tem certeza que deseja deletar este polo")) {
            this.unidadeDataService.deleteUnidade(id).subscribe(res => {
                this.fetchUnidades();
            });
        }
    }

    fetchUnidades() {
        this.unidadeDataService
            .getPolos()
            .subscribe((unidades: Unidade[]) => {
                this.dataSource = new MatTableDataSource(unidades);
                this.dataSource.sort = this.sort;
            });
    }
}
