import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TipoEquipamento } from '../../_shared/models/tipoEquipamento.model';
import { FormGroup, FormControl, Validators, PatternValidator } from '@angular/forms';
import { TipoEquipamentoDataService } from "src/app/_shared/services/tipoEquipamento-data.service";
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';

@Component({
    selector: "app-tipoEquipamento-edit",
    templateUrl: "./tipoEquipamento-edit.component.html",
    styleUrls: ["./tipoEquipamento-edit.component.scss"]
})

export class TipoEquipamentoEditComponent implements OnInit {
    tipoEquipamento: TipoEquipamento = new TipoEquipamento("", "", "");
    tipoEquipamentoForm: FormGroup;
    tipoEquipamentoId: number;
    editmode = false;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private tipoEquipamentoDataService: TipoEquipamentoDataService,
        private snackBarService: SnackBarService
    ) {}


    ngOnInit() {

        this.route.params.subscribe((params:Params) =>{
            this.tipoEquipamentoId = +params["id"];
            this.editmode = params["id"] != null;
            console.log("editMode: "+this.editmode);

            if (this.editmode) {
                this.tipoEquipamentoDataService.getTipoEquipamento(this.tipoEquipamentoId)
                    .subscribe((tipoEquipamento:TipoEquipamento) => {
                        this.tipoEquipamento = tipoEquipamento;
                        this.initForm(this.tipoEquipamento);
                    });
            }else{
                this.initForm(this.tipoEquipamento);
            }
        })
    }

    onAddTipoEquipamento() {
        if(this.editmode){
            this.tipoEquipamentoDataService.updateTipoEquipamento(this.tipoEquipamentoId, this.tipoEquipamentoForm.value)
            .subscribe(
                res => {
                    this.snackBarService.openSnackBar("Tipo de Equipamento atualizada com sucesso");
                    this.router.navigate(["/tipoEquipamentos"], { relativeTo: this.route });
                }
            )
        }
        else{
            this.tipoEquipamentoDataService.storeTipoEquipamento(this.tipoEquipamentoForm.value)
            .subscribe(
                (tipoEquipamento:TipoEquipamento) =>{
                    this.snackBarService.openSnackBar("Tipo de Equipamento cadastrado com sucesso");
                    this.router.navigate(["/tipoEquipamentos"], { relativeTo: this.route });
                },
                error => {
                    this.tipoEquipamentoForm.setErrors = error;
                    const fields = Object.keys(error || {});
                    fields.forEach((field) => {
                        this.tipoEquipamentoForm.get(field).setErrors({ serverside: error[field]});
                    })
                }
            );
        }
    }

    onCancel() {
        this.router.navigate(["/tipoEquipamentos"], { relativeTo: this.route });
    }
    
    private initForm(tipoEquipamento:TipoEquipamento){
        this.tipoEquipamentoForm = new FormGroup({
            nome: new FormControl(tipoEquipamento.nome, Validators.required),
            descricao: new FormControl(tipoEquipamento.descricao, Validators.required)
            
        });
	}

}
