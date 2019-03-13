import { Component, OnInit } from '@angular/core';
import { ProjetoDataService } from 'src/app/_shared/services/projeto-data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Etapa } from 'src/app/_shared/models/etapa.model';
import { Tarefa } from 'src/app/_shared/models/tarefa.model';
import {Location} from '@angular/common';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';

@Component({
    selector: 'app-envio-list',
    templateUrl: './envio-list.component.html',
    styleUrls: ['./envio-list.component.scss']
})
export class EnvioListComponent implements OnInit {
    projetoId: number;
    etapaEnvio = Etapa.EMPTY_MODEL;
    tarefas: Tarefa[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private projetoDataService: ProjetoDataService,
        private location: Location,
        private snackBarService: SnackBarService
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.projetoId = +params["id"];
            this.fetchTarefas();
        });
    }

    fetchTarefas(){
        this.projetoDataService.getEtapaEnvio(this.projetoId).subscribe((etapa: Etapa) => {
            this.etapaEnvio = etapa;
            this.tarefas = this.etapaEnvio.tarefas;
        })
    }

    onDeleteTarefa(tarefaId:number){
        if (confirm("Tem certeza que deseja deletar esta tarefa?")) {
            this.projetoDataService.deleteTarefa(this.etapaEnvio.id, tarefaId).subscribe(res =>{
                this.fetchTarefas();
                // this.projetoDataService.
            }, error => {
                this.snackBarService.openSnackBar("Ocorreu um erro ao processar a requisição. Tente novamente.")
                this.router.navigate(["/projetos"])
            });
        }
    }

    onCancel(){
        this.location.back()
    }

}
