import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UnidadeDataService } from 'src/app/_shared/services/unidade-data.service';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';
import { Unidade } from 'src/app/_shared/models/unidade.model';
import { ProjetoDataService } from 'src/app/_shared/services/projeto-data.service';
import { DateAdapter } from '@angular/material';
import { Projeto } from 'src/app/_shared/models/projeto.model';
import { Tarefa } from 'src/app/_shared/models/tarefa.model';
import { Etapa } from 'src/app/_shared/models/etapa.model';
import { EquipamentoProjeto } from 'src/app/_shared/models/equipamentoProjeto.model';


@Component({
    selector: "app-projeto-edit",
    templateUrl: "./projeto-edit.component.html",
    styleUrls: ["./projeto-edit.component.scss"]
})
export class ProjetoEditComponent implements OnInit {
    step = 0;
    projetoForm: FormGroup;
    unidades: Unidade[];
    editMode=false;
    projetoId:number;
    projeto:Projeto = Projeto.EMPTY_MODEL;
    etapaEnvio: Etapa;
    tarefas:Tarefa[];
    equipDisponiveis:EquipamentoProjeto[];


    constructor(
        private route:ActivatedRoute,
        private router:Router,
        private unidadeDataService:UnidadeDataService,
        private projetoDataService:ProjetoDataService,
        private snackBarService:SnackBarService,
        private dateAdapter: DateAdapter<any>
    ) {
        this.dateAdapter.setLocale('pt-BR');
    }

    ngOnInit() {
        this.fetchPolos();
        this.route.params.subscribe((params:Params)=>{
            this.projetoId = +params["id"];
            this.editMode = params["id"] != null;
            if(this.editMode){
                this.projetoDataService.getProjeto(this.projetoId).subscribe((projeto:Projeto)=>{
                    this.projeto = projeto;
                    this.initForm(this.projeto);
                    this.fetchEtapaEnvio(this.projetoId);
                    if(projeto.equipamentos_projeto)
                        this.fetchEquipPendentes();
                })
            }else{
                this.initForm(this.projeto);
            }
        });


    }

    initForm(projeto:Projeto){
        this.projetoForm = new FormGroup({
            numero: new FormControl(projeto.numero, Validators.required),
            descricao: new FormControl(projeto.descricao,Validators.required),
            unidade_id:new FormControl(projeto.unidade.id,Validators.required),
            data_inicio_previsto: new FormControl(projeto.data_inicio_previsto,Validators.required),
            data_fim_previsto: new FormControl(projeto.data_fim_previsto, Validators.required)
        })
    }

    onAddProjeto() {
        if(this.editMode){
            this.projetoDataService.updateProjeto(this.projetoId,this.projetoForm.value)
            .subscribe(res =>{
                this.snackBarService.openSnackBar("Projeto atualizado com sucesso.");
                this.router.navigate(["../../"+this.projetoId+"/adicionar-kits"], { relativeTo: this.route });
            });
        }else{
            this.projeto.kit_id = 3;
            this.projetoDataService.storeProjeto(this.projetoForm.value)
            .subscribe(res =>{
                this.snackBarService.openSnackBar("Projeto incluído com sucesso.");
                this.router.navigate(["../" + res["data"].id + "/adicionar-kits"], { relativeTo: this.route });
            });
        }
    }

    onCancel() {
        this.router.navigate(["/projetos"], { relativeTo: this.route });
    }

    onAddKits(){
        this.router.navigate(["../../" + this.projetoId + "/adicionar-kits"], { relativeTo: this.route });
    }
    onAddEnvio(){
        this.router.navigate(["../../" + this.projetoId + "/etapa-envio"], { relativeTo: this.route });
        /*if(this.etapaEnvio){
            this.router.navigate(["../../" + this.projetoId + "/etapa-envio/"+this.etapaEnvio.id], { relativeTo: this.route });
        }else{
            this.router.navigate(["../../" + this.projetoId + "/etapa-envio"], { relativeTo: this.route });
        }*/
    }


    fetchPolos(){
        this.unidadeDataService.getPolos().subscribe((unidades: Unidade[]) => {
            this.unidades = unidades;
        });
    }

    fetchEtapaEnvio(projetoId:number){
        this.projetoDataService.getEtapaEnvio(this.projetoId).subscribe((etapa: Etapa) => {
            this.etapaEnvio = etapa
        })
    }

    fetchEquipPendentes() {
        this.projetoDataService.getEquipDisponiveisEnvio(this.projetoId)
            .subscribe((equipamentos: EquipamentoProjeto[]) => {
                this.equipDisponiveis = equipamentos;
            });
    }

    setStep(index: number) {
        this.step = index;
    }

    nextStep() {
        this.step++;
    }

    prevStep() {
        this.step--;
    }
}
