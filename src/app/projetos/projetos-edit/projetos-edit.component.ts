import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UnidadeDataService } from 'src/app/_shared/services/unidade-data.service';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';
import { Unidade } from 'src/app/_shared/models/unidade.model';
import { ProjetoDataService } from 'src/app/_shared/services/projeto-data.service';
import { DateAdapter } from '@angular/material';
import { Projeto } from 'src/app/_shared/models/projeto.model';
import { DatePipe } from '@angular/common';


@Component({
    selector: "app-projetos-edit",
    templateUrl: "./projetos-edit.component.html",
    styleUrls: ["./projetos-edit.component.scss"]
})
export class ProjetosEditComponent implements OnInit {
    projetoForm: FormGroup;
    unidades: Unidade[];
    editMode=false;
    projetoId:number;
    projeto:Projeto = Projeto.EMPTY_MODEL;


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
                    console.log(projeto);
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
            data_implantacao_prevista: new FormControl(projeto.data_implantacao_prevista,Validators.required)
        })
    }

    onAddProjeto() {
        if(this.editMode){
            this.projetoDataService.updateProjeto(this.projetoId,this.projetoForm.value)
            .subscribe(res =>{
                this.snackBarService.openSnackBar("Projeto atualizado com sucesso.");
                this.router.navigate(["/projetos"], { relativeTo: this.route });
            });
        }else{
            this.projetoDataService.storeProjeto(this.projetoForm.value)
            .subscribe((projeto:Projeto) =>{
                this.snackBarService.openSnackBar("Projeto incluído com sucesso.");
                this.router.navigate(["/projetos"], {relativeTo:this.route});
            });
        }
    }

    onCancel() {
        this.router.navigate(["/projetos"], { relativeTo: this.route });
    }


    fetchPolos(){
        this.unidadeDataService.getPolos().subscribe((unidades: Unidade[]) => {
            this.unidades = unidades;
        });
    }
}
