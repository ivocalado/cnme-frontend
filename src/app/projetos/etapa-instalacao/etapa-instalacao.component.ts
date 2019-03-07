import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProjetoDataService } from 'src/app/_shared/services/projeto-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Unidade } from 'src/app/_shared/models/unidade.model';
import { UnidadeDataService } from 'src/app/_shared/services/unidade-data.service';
import { Etapa } from 'src/app/_shared/models/etapa.model';
import { Tarefa } from 'src/app/_shared/models/tarefa.model';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';
import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
    selector: 'app-etapa-instalacao',
    templateUrl: './etapa-instalacao.component.html',
    styleUrls: ['./etapa-instalacao.component.scss']
})
export class EtapaInstalacaoComponent implements OnInit {

    instalacaoForm:FormGroup;
    projetoId:number;
    unidades:Unidade[];
    editMode=false;
    etapaInstalacao:Etapa = Etapa.EMPTY_MODEL;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private projetoDataService: ProjetoDataService,
        private unidadeDataService:UnidadeDataService,
        private snackBarService:SnackBarService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params:Params)=>{
            this.projetoId = +params["id"];
            this.projetoDataService.getEtapaInstalacao(this.projetoId).subscribe((etapa:Etapa)=>{
                this.etapaInstalacao = etapa;
                this.initForm(etapa);
                this.editMode=true;
            },error => {
                this.initForm(this.etapaInstalacao)
            })
            this.fetchEmpresas();

        });
    }

    onAddInstalacao(){
        let tarefa:Tarefa = this.instalacaoForm.value;
        tarefa.usuario_id = this.authService.getCurrentUser().id;
        this.projetoDataService.storeTarefaInstalacao(this.projetoId,this.instalacaoForm.value)
        .subscribe(res =>{
            this.snackBarService.openSnackBar("Etapa salva com sucesso.");
            if(this.editMode)
                this.router.navigate(["/projetos/editar/" + this.projetoId + "/step/4"], { relativeTo: this.route });
            else
                this.router.navigate(["../etapa-ativacao"], { relativeTo: this.route });
        })
    }

    onCancel() {
        this.router.navigate(["/projetos/editar/" + this.projetoId + "/step/3"], { relativeTo: this.route });
    }

    initForm(etapa:Etapa){
        let tarefa:Tarefa = Tarefa.EMPTY_MODEL;
        if(etapa.tarefas)
            tarefa = etapa.tarefas[0];

        this.instalacaoForm = new FormGroup({
            unidade_responsavel_id: new FormControl(tarefa.unidade_responsavel.id, Validators.required),
            numero: new FormControl(tarefa.numero),
            data_inicio_prevista: new FormControl(tarefa.data_inicio_prevista, Validators.required),
            data_fim_prevista: new FormControl(tarefa.data_fim_prevista, Validators.required)
        });

        if (!etapa.tarefas){
            this.instalacaoForm.reset();
        }
    }



    fetchEmpresas(){
        this.unidadeDataService.getEmpresas().subscribe((unidades:Unidade[])=>{
            this.unidades = unidades;
        })
    }

}
