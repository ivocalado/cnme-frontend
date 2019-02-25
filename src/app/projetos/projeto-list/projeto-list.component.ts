import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjetoDataService } from 'src/app/_shared/services/projeto-data.service';
import { Projeto } from 'src/app/_shared/models/projeto.model';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-projeto-list',
    templateUrl: './projeto-list.component.html',
    styleUrls: ['./projeto-list.component.scss']
})
export class ProjetoListComponent implements OnInit {
    displayedColumns: string[] = ["numero", "unidade", "previsao", "status","actions"];
    dataSource;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private route:ActivatedRoute,
        private router:Router,
        private projetoDataService:ProjetoDataService
    ) { }

    ngOnInit() {
        this.fetchProjetos();
    }

    onDetails(id: number) {
        this.router.navigate(["detalhes", id], { relativeTo: this.route });
    }

    onEdit(id: number) {
        this.router.navigate(["editar", id], { relativeTo: this.route });
    }
    onDelete(id:number){
    if(confirm("Tem certeza que deseja deletar este polo")) {
        this.projetoDataService.deleteProjeto(id).subscribe(res => {
            this.fetchProjetos();
        });
    }
}

    fetchProjetos(){
        this.projetoDataService.getProjetos().subscribe((projetos:Projeto[])=>{
            this.dataSource = new MatTableDataSource(projetos);
            this.dataSource.sort = this.sort;
        });
    }

}
