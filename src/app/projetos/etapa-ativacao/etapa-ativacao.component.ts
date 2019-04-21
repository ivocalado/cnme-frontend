import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Unidade } from 'src/app/_shared/models/unidade.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProjetoDataService } from 'src/app/_shared/services/projeto-data.service';
import { UnidadeDataService } from 'src/app/_shared/services/unidade-data.service';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';
import { Etapa } from 'src/app/_shared/models/etapa.model';
import { Tarefa } from 'src/app/_shared/models/tarefa.model';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { Projeto } from 'src/app/_shared/models/projeto.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-etapa-ativacao',
  templateUrl: './etapa-ativacao.component.html',
  styleUrls: ['./etapa-ativacao.component.scss']
})
export class EtapaAtivacaoComponent implements OnInit {


    ativacaoForm: FormGroup;
    projetoId: number;
    unidades: Unidade[];
    editMode = false;
    etapaAtivacao: Etapa = Etapa.EMPTY_MODEL;
    minDate: Date
    maxDate: Date

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private projetoDataService: ProjetoDataService,
        private unidadeDataService: UnidadeDataService,
        private snackBarService: SnackBarService,
        private authService: AuthService,
        private location: Location
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.projetoId = +params["id"];
            this.projetoDataService.getEtapaAtivacao(this.projetoId).subscribe((etapa: Etapa) => {
                this.etapaAtivacao = etapa;
                this.initForm(etapa);
                this.editMode = true;
            }, error => {
                console.log(this.etapaAtivacao)
                this.initForm(this.etapaAtivacao)
            })
            
            this.projetoDataService.getProjeto(this.projetoId).subscribe((projeto: Projeto) => {
                this.maxDate = new Date(projeto.data_fim_previsto)
                this.maxDate.setDate(this.maxDate.getDate() + 1)
                console.log(this.maxDate)
            })

            this.projetoDataService.getEtapaInstalacao(this.projetoId).subscribe((etapa: Etapa) => {
                this.minDate = new Date(etapa.tarefas[0].data_fim_prevista) //a data de inicio eh igual a maior data de entrega
                this.minDate.setDate(this.minDate.getDate() + 1)
            })

            this.fetchEmpresas();

        });
    }

    onAddAtivacao() {
        let tarefa: Tarefa = this.ativacaoForm.value;
        tarefa.usuario_id = this.authService.getCurrentUser().id;
        console.log(this.ativacaoForm.value);
        this.projetoDataService.storeTarefaAtivacao(this.projetoId, this.ativacaoForm.value)
            .subscribe(res => {
                if (this.editMode){
                    this.router.navigate(["/projetos/editar/" + this.projetoId], { relativeTo: this.route });
                    this.snackBarService.openSnackBar("Etapa salva com sucesso.");
                }
                else{
                    this.router.navigate(["/projetos/"], { relativeTo: this.route });
                    this.snackBarService.openSnackBar("Plano de instalação concluido.");
                }

            })
    }

    onCancel() {
        this.location.back()
    }

    initForm(etapa: Etapa) {
        let tarefa: Tarefa = Tarefa.EMPTY_MODEL;
        if (etapa.tarefas)
            tarefa = etapa.tarefas[0];


        this.ativacaoForm = new FormGroup({
            unidade_responsavel_id: new FormControl(tarefa.unidade_responsavel.id, Validators.required),
            numero: new FormControl(tarefa.numero),
            data_inicio_prevista: new FormControl(tarefa.data_inicio_prevista, Validators.required),
            data_fim_prevista: new FormControl(tarefa.data_fim_prevista, Validators.required)
        });

        if (!etapa.tarefas) {
            this.ativacaoForm.reset();
        }
    }



    fetchEmpresas() {
        this.unidadeDataService.getAllEmpresas().subscribe((res: any) => {
            this.unidades = res.unidades;
        })
    }

}
