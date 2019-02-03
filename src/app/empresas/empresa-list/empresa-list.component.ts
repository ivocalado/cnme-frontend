import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Unidade } from "src/app/_shared/models/unidade.model";
import { UnidadeDataService } from "src/app/_shared/services/unidade-data.service";
import { MatSort, MatTableDataSource } from "@angular/material";

@Component({
    selector: 'app-empresa-list',
    templateUrl: './empresa-list.component.html',
    styleUrls: ['./empresa-list.component.scss']
})
export class EmpresaListComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ["nome", "tipo", "estado", "actions"];
    dataSource;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private unidadeDataService: UnidadeDataService
    ) { }

    ngOnInit() {
        this.fetchUnidades();
    }

    onEdit(id: number) {
        this.router.navigate(["editar", id], { relativeTo: this.route });
    }

    onDetails(id: Number) {
        this.router.navigate(['detalhes', id], { relativeTo: this.route });
    }

    onDelete(id: number) {
        if (confirm("Tem certeza que deseja deletar esta empresa")) {
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
