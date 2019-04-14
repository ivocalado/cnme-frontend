import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Kit } from '../../_shared/models/kit.model';
import { KitDataService } from '../../_shared/services/kit-data.service';
import { MatSort, MatTableDataSource, PageEvent } from '@angular/material';

@Component({
    selector: "app-kit-list",
    templateUrl: "./kit-list.component.html",
    styleUrls: ["./kit-list.component.scss"]
})
export class KitListComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ["nome", "descricao", "actions"];
    dataSource;


    // "links": {
    //     "first": "https://cnme-dev.nees.com.br/api/kits?page=1",
    //     "last": "https://cnme-dev.nees.com.br/api/kits?page=1",
    //     "prev": null,
    //     "next": null
    // },
    // "meta": {
    //     "current_page": 1,
    //     "from": 1,
    //     "last_page": 1,
    //     "path": "https://cnme-dev.nees.com.br/api/kits",
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
        private kitDataService: KitDataService
    ) {}

    ngOnInit() {
        this.fetchKits(this.INITIAL_PAGE_INDEX);
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
                this.fetchKits(this.INITIAL_PAGE_INDEX);
            });
        }
    }

    fetchKits(pageIndex: number) {
        this.kitDataService
            .getKits(pageIndex)
            .subscribe((res: any)  => {
                this.dataSource = new MatTableDataSource(res.kits);
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
        this.fetchKits(pageEvent.pageIndex + 1)
    }
}
