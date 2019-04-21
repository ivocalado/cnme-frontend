import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoEquipamento } from '../../_shared/models/tipoEquipamento.model';
import { TipoEquipamentoDataService } from '../../_shared/services/tipoEquipamento-data.service';
import { MatSort, MatTableDataSource, PageEvent } from '@angular/material';

@Component({
    selector: "app-tipoEquipamento-list",
    templateUrl: "./tipoEquipamento-list.component.html",
    styleUrls: ["./tipoEquipamento-list.component.scss"]
})
export class TipoEquipamentoListComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ["nome", "descricao", "actions"];
    dataSource;

    // "links": {
    //   "first": "https://cnme-dev.nees.com.br/api/chamados?page=1",
    //   "last": "https://cnme-dev.nees.com.br/api/chamados?page=12",
    //   "prev": null,
    //   "next": "https://cnme-dev.nees.com.br/api/chamados?page=2"
    // },
    // "meta": {
    //   "current_page": 1,
    //   "from": 1,
    //   "last_page": 12,
    //   "path": "https://cnme-dev.nees.com.br/api/chamados",
    //   "per_page": "2",
    //   "to": 2,
    //   "total": 23
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
    INITIAL_PAGE_SIZE: number = 10
    pageSizeOptions: number[] = [5, 10, 25, 100];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private tipoEquipamentoDataService: TipoEquipamentoDataService
    ) {}

    ngOnInit() {
        this.fetchTipoEquipamentos(this.INITIAL_PAGE_SIZE, this.INITIAL_PAGE_INDEX);
    }

    onEdit(id: number) {
        this.router.navigate(["editar", id], { relativeTo: this.route });
    }

    onDetails(id:Number){
        this.router.navigate(['detalhes', id], { relativeTo: this.route });
    }

    onDelete(id: number) {
        if (confirm("Tem certeza que deseja deletar este tipo de equipamento")) {
            this.tipoEquipamentoDataService.deleteTipoEquipamento(id).subscribe(res => {
                this.fetchTipoEquipamentos(this.INITIAL_PAGE_SIZE, this.INITIAL_PAGE_INDEX);
            });
        }
    }

    fetchTipoEquipamentos(pageSize: number, pageIndex: number) {
        this.tipoEquipamentoDataService
            .getTipoEquipamentos(pageSize, pageIndex)
            .subscribe((res: any) => {
                this.dataSource = new MatTableDataSource(res.tipoEquipamentos);
                this.dataSource.sort = this.sort;
                this.buildPagination(res.links, res.meta)
            });
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
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

    newPaginationEvent(pageEvent: PageEvent) {
        this.fetchTipoEquipamentos(pageEvent.pageSize,  pageEvent.pageIndex + 1)
    }

  
}
