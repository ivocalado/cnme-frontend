import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjetoDataService } from 'src/app/_shared/services/projeto-data.service';
import { Projeto } from 'src/app/_shared/models/projeto.model';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
    selector: "app-projeto-list",
    templateUrl: "./projeto-list.component.html",
    styleUrls: ["./projeto-list.component.scss"]
})
export class ProjetoListComponent implements OnInit {
    displayedColumns: string[] = [
        "numero",
        "unidade",
        "previsao",
        "status",
        "actions"
    ];
    dataSource;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private projetoDataService: ProjetoDataService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.fetchProjetos();
    }

    onDetails(id: number) {
        this.router.navigate(["detalhes", id], { relativeTo: this.route });
    }

    onEdit(id: number) {
        this.router.navigate(["editar", id], { relativeTo: this.route });
    }
    onDelete(id: number) {
        this.router.navigate(["cancelar", id], { relativeTo: this.route });
    }

    fetchProjetos() {
        this.projetoDataService
            .getProjetos()
            .subscribe((projetos: Projeto[]) => {
                this.dataSource = new MatTableDataSource(projetos);
                this.dataSource.sort = this.sort;
            });
    }

    canEdit(projeto: Projeto) {
        return projeto.status == "PLANEJAMENTO";
    }

    canCancelProject(projeto: Projeto) {
        return projeto.status != "CANCELADO";
    }

    get exibeTvEscola() {
        let usuarioAutenticado = this.authService.getCurrentUser();
        console.log(usuarioAutenticado);
        let classe = usuarioAutenticado.unidade.classe;
        return classe == "admin" || classe == "tvescola";
    }
}
