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
import { Projeto } from 'src/app/_shared/models/projeto.model';
import {Location} from '@angular/common';

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
    minDate: Date
    maxDate: Date
    isFormModified: boolean = false

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private projetoDataService: ProjetoDataService,
        private unidadeDataService:UnidadeDataService,
        private snackBarService:SnackBarService,
        private authService: AuthService,
        private location: Location
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

            this.projetoDataService.getProjeto(this.projetoId).subscribe((projeto: Projeto) => {
                this.maxDate = new Date(projeto.data_fim_previsto)
                this.maxDate.setDate(this.maxDate.getDate() + 1)
                console.log(this.maxDate)
            })

            this.projetoDataService.getEtapaEnvio(this.projetoId).subscribe((etapa: Etapa) => {
                let dates = []
                for (let tarefa of etapa.tarefas) {
                    dates.push(new Date(tarefa.data_fim_prevista))
                }
                this.minDate = new Date(Math.max.apply(null, dates)) //a data de inicio eh igual a maior data de entrega
                this.minDate.setDate(this.minDate.getDate() + 1)
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
            if(this.editMode) {
                this.projetoDataService.getEtapaAtivacao(this.projetoId).subscribe((etapa: Etapa) => {
                    this.projetoDataService.deleteEtapa(etapa.id).subscribe(msg => {
                        console.log("ETAPA ATIVAÇÂO removida com sucesso")
                    })
                })
                this.router.navigate(["/projetos/editar/" + this.projetoId + "  /step/4"], { relativeTo: this.route });
            }
            else {
                console.log("passou no else")
                this.router.navigate(["../etapa-ativacao"], { relativeTo: this.route });
            }
        })
    }

    onCancel() {
        this.location.back()
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

        this.instalacaoForm.valueChanges.subscribe(val => {
            this.isFormModified = true
        })
    }



    fetchEmpresas(){
        this.unidadeDataService.getAllEmpresas().subscribe((unidades:Unidade[])=>{
            this.unidades = unidades;
        })
    }

}
