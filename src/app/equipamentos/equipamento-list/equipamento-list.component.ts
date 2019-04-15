import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipamento } from '../../_shared/models/equipamento.model';
import { EquipamentoDataService } from '../../_shared/services/equipamento-data.service';
import { MatSort, MatTableDataSource, PageEvent } from '@angular/material';

@Component({
    selector: "app-equipamento-list",
    templateUrl: "./equipamento-list.component.html",
    styleUrls: ["./equipamento-list.component.scss"]
})
export class EquipamentoListComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ["nome", "tipoEquipamento", "descricao", "requisitos", "actions"];
    dataSource;

        // "links": {
    //     "first": "https://cnme-dev.nees.com.br/api/projeto-cnme?page=1",
    //     "last": "https://cnme-dev.nees.com.br/api/projeto-cnme?page=1",
    //     "prev": null,
    //     "next": null
    // },
    // "meta": {
    //     "current_page": 1,
    //     "from": 1,
    //     "last_page": 1,
    //     "path": "https://cnme-dev.nees.com.br/api/projeto-cnme",
    //     "per_page": 25,
    //     "to": 1,
    //     "total": 1
    // }
    pagination = {
        firstPageLink: null,
        lastPageLink: null,
        previousPageLink: null,
        nextPageLink: null,
        currentPageIndex: null,
        itens_per_page: null,
        total: null
    }

    INITIAL_PAGE_INDEX: number = 1

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private equipamentoDataService: EquipamentoDataService
    ) {}

    ngOnInit() {
        this.fetchEquipamentos(this.INITIAL_PAGE_INDEX);
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
                this.fetchEquipamentos(this.INITIAL_PAGE_INDEX);
            });
        }
    }

    fetchEquipamentos(pageIndex: number) {
        this.equipamentoDataService
            .getEquipamentos(pageIndex)
            .subscribe((res: any) => {
                this.dataSource = new MatTableDataSource(res.equipamentos);
                this.dataSource.sort = this.sort;
                this.buildPagination(res.links, res.meta)
            });
    }
    buildPagination(links: any, meta: any) {
        this.pagination.firstPageLink = links.first
        this.pagination.lastPageLink = links.last
        this.pagination.previousPageLink = links.prev
        this.pagination.nextPageLink = links.next
        this.pagination.currentPageIndex = meta.current_page
        this.pagination.itens_per_page = meta.per_page
        this.pagination.total = meta.total
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    newPaginationEvent(pageEvent: PageEvent) {
        this.fetchEquipamentos(pageEvent.pageIndex + 1)
    }
}
