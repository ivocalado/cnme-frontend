import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Kit } from '../../_shared/models/kit.model';
import { KitDataService } from '../../_shared/services/kit-data.service';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
    selector: "app-kit-list",
    templateUrl: "./kit-list.component.html",
    styleUrls: ["./kit-list.component.scss"]
})
export class KitListComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ["nome", "descricao", "versao", "status", "actions"];
    dataSource;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private kitDataService: KitDataService
    ) {}

    ngOnInit() {
        this.fetchKits();
    }

    onEdit(id: number) {
        this.router.navigate(["editar", id], { relativeTo: this.route });
    }

    onDetails(id:Number){
        this.router.navigate(['detalhes', id], { relativeTo: this.route });
    }

    onDelete(id: number) {
        if (confirm("Tem certeza que deseja deletar este kit")) {
            this.kitDataService.deleteKit(id).subscribe(res => {
                this.fetchKits();
            });
        }
    }

    fetchKits() {
        this.kitDataService
            .getKits()
            .subscribe((kits: Kit[]) => {
                this.dataSource = new MatTableDataSource(kits);
                this.dataSource.sort = this.sort;
            });
    }
}
