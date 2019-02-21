import { Component, OnInit } from '@angular/core';
import { ProjetoDataService } from 'src/app/_shared/services/projeto-data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Etapa } from 'src/app/_shared/models/etapa.model';
import { Tarefa } from 'src/app/_shared/models/tarefa.model';

@Component({
    selector: 'app-envio-list',
    templateUrl: './envio-list.component.html',
    styleUrls: ['./envio-list.component.scss']
})
export class EnvioListComponent implements OnInit {
    projetoId: number;
    //etapaId: number;
    etapaEnvio = Etapa.EMPTY_MODEL;
    tarefas: Tarefa[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private projetoDataService: ProjetoDataService,
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.projetoId = +params["id"];
            //this.etapaId = +params["etapaId"];
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
        if (confirm("Tem certeza que deseja deletar estea tarefa?")) {
            this.projetoDataService.deleteTarefa(this.etapaEnvio.id, tarefaId).subscribe(res =>{
                this.fetchTarefas();
                window.location.reload();
            });
        }
    }

}
