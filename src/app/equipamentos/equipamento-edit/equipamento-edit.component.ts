import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Equipamento } from '../../_shared/models/equipamento.model';
import { Localidade } from '../../_shared/models/localidade.model';
import { FormGroup, FormControl, Validators, PatternValidator } from '@angular/forms';
import { TipoEquipamentoDataService } from '../../_shared/services/tipoEquipamento-data.service';
import { EquipamentoDataService } from "../../_shared/services/equipamento-data.service";
import { TipoEquipamento } from '../../_shared/models/tipoEquipamento.model';

import { SnackBarService } from '../../_shared/helpers/snackbar.service';

@Component({
    selector: "app-equipamento-edit",
    templateUrl: "./equipamento-edit.component.html",
    styleUrls: ["./equipamento-edit.component.scss"]
})

export class EquipamentoEditComponent implements OnInit {
    tipoEquipamentos: TipoEquipamento[];
    tipoEquipamento:TipoEquipamento = TipoEquipamento.EMPTY_MODEL;
    equipamento: Equipamento = Equipamento.EMPTY_MODEL;
    equipamentoForm: FormGroup;
    equipamentoId: number;
    editmode = false;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private tipoEquipamentoDataService: TipoEquipamentoDataService,
        private equipamentoDataService: EquipamentoDataService,
        private snackBarService: SnackBarService
    ) {}


    ngOnInit() {

        this.tipoEquipamentoDataService.getTipoEquipamentos().subscribe((tipoEquipamentos: TipoEquipamento[]) => {
            this.tipoEquipamentos = tipoEquipamentos;
        });


        this.route.params.subscribe((params:Params) =>{
            this.equipamentoId = +params["id"];
            this.editmode = params["id"] != null;
            console.log("editMode: "+this.editmode);

            if (this.editmode) {
                this.equipamentoDataService.getEquipamento(this.equipamentoId)
                    .subscribe((equipamento:Equipamento) => {
                        this.equipamento = equipamento;
                        this.initForm(this.equipamento);
                    });
            }else{
                this.initForm(this.equipamento);
            }
        })
    }

    onAddEquipamento() {
        if(this.editmode){
            this.equipamentoDataService.updateEquipamento(this.equipamentoId, this.equipamentoForm.value)
            .subscribe(
                res => {
                    this.snackBarService.openSnackBar("Equipamento atualizado com sucesso");
                    this.router.navigate(["/equipamentos"], { relativeTo: this.route });
                }
            )
        }
        else{
            this.equipamentoDataService.storeEquipamento(this.equipamentoForm.value, this.equipamentoForm.value.tipo_equipamento_id)
            .subscribe(
                (equipamento:Equipamento) =>{
                    this.snackBarService.openSnackBar("Equipamento cadastrado com sucesso");
                    this.router.navigate(["/equipamentos"], { relativeTo: this.route });
                },
                error => {
                    this.equipamentoForm.setErrors = error;
                    const fields = Object.keys(error || {});
                    fields.forEach((field) => {
                        this.equipamentoForm.get(field).setErrors({ serverside: error[field]});
                    })
                }
            );
        }
    }

    onCancel() {
        this.router.navigate(["/equipamentos"], { relativeTo: this.route });
    }

    private initForm(equipamento:Equipamento){
        this.equipamentoForm = new FormGroup({
            nome: new FormControl(equipamento.nome, Validators.required),
            descricao: new FormControl(equipamento.descricao, Validators.required),
            fornecedor: new FormControl(equipamento.fornecedor, Validators.required),
            requisitos: new FormControl(equipamento.requisitos),
            tipo_equipamento_id: new FormControl(equipamento.tipo_equipamento_id, Validators.required)
        });
    }
}
