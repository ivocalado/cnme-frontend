import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Kit } from '../../_shared/models/kit.model';
import { Localidade } from '../../_shared/models/localidade.model';
import { FormGroup, FormControl, Validators, PatternValidator } from '@angular/forms';
import { KitDataService } from "../../_shared/services/kit-data.service";
import { SnackBarService } from '../../_shared/helpers/snackbar.service';

@Component({
    selector: "app-kit-edit",
    templateUrl: "./kit-edit.component.html",
    styleUrls: ["./kit-edit.component.scss"]
})

export class KitEditComponent implements OnInit {
    kit: Kit = Kit.EMPTY_MODEL
    kitForm: FormGroup;
    kitId: number;
    editmode = false;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private kitDataService: KitDataService,
        private snackBarService: SnackBarService
    ) {}


    ngOnInit() {

        this.route.params.subscribe((params:Params) =>{
            this.kitId = +params["id"];
            this.editmode = params["id"] != null;
            console.log("editMode: "+this.editmode);

            if (this.editmode) {
                this.kitDataService.getKit(this.kitId)
                    .subscribe((kit:Kit) => {
                        this.kit = kit;
                        this.initForm(this.kit);
                    });
            }else{
                this.initForm(this.kit);
            }
        })
    }

    onAddKit() {
        if(this.editmode){

            this.kitDataService.updateKit(this.kitId, this.kitForm.value)
            .subscribe(
                res => {
                    this.snackBarService.openSnackBar("Kit atualizado com sucesso");
                    this.router.navigate(["/kits"], { relativeTo: this.route });
                }
            )
        }
        else{
            this.kitDataService.storeKit(this.kitForm.value, 1)
            .subscribe(
                (kit:Kit) =>{
                    this.snackBarService.openSnackBar("Kit cadastrado com sucesso");
                    this.router.navigate(["/kits"], { relativeTo: this.route });
                },
                error => {
                    console.log(error)
                    this.kitForm.setErrors = error;
                    const fields = Object.keys(error || {});
                    fields.forEach((field) => {
                        this.kitForm.get(field).setErrors({ serverside: error[field]});
                    })
                }
            );
        }
    }

    onCancel() {
        this.router.navigate(["/kits"], { relativeTo: this.route });
    }

    private initForm(kit:Kit){
        this.kitForm = new FormGroup({
            nome: new FormControl(kit.nome, Validators.required),
            descricao: new FormControl(kit.descricao),
            versao: new FormControl(kit.versao),
            status: new FormControl(kit.status, [Validators.required])
      
        });
    }

    
}
