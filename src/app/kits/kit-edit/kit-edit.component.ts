import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Kit } from '../../_shared/models/kit.model';
import { FormGroup, FormControl, Validators, PatternValidator } from '@angular/forms';
import { KitDataService } from "../../_shared/services/kit-data.service";
import { SnackBarService } from '../../_shared/helpers/snackbar.service';
import { Equipamento } from '../../_shared/models/equipamento.model';
import { EquipamentoDataService } from '../../_shared/services/equipamento-data.service';
import { MatSort, MatTableDataSource} from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {SelectionModel} from '@angular/cdk/collections';
import {Location} from '@angular/common';


@Component({
    selector: "app-kit-edit",
    templateUrl: "./kit-edit.component.html",
    styleUrls: ["./kit-edit.component.scss"]
})

export class KitEditComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ["select", "nome", "tipoEquipamento", "descricao", "requisitos"];
    dataSource;
    equipamentos_ids;
    selection = new SelectionModel<Equipamento>(true, []);

    kit: Kit = Kit.EMPTY_MODEL
    kitForm: FormGroup;
    kitId: number;
    editmode = false;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private kitDataService: KitDataService,
        private equipamentoDataService: EquipamentoDataService,
        private snackBarService: SnackBarService,
        private location: Location
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
                        this.fetchEquipamentos()
                    });
            }else{
                this.initForm(this.kit);
                this.fetchEquipamentos()
            }
        })

        
    }

    onAddKit() {
        
        this.equipamentos_ids = []
            
        this.selection.selected.forEach(row => 
            this.equipamentos_ids.push(row.id)
        );

        if(this.editmode){
            this.kitDataService.updateKit(this.kitId, this.kitForm.value)
            .subscribe(
                res => {
                    this.kitDataService.updateEquipamentosToKit(this.kitId, this.equipamentos_ids)
                        this.snackBarService.openSnackBar("Kit atualizado com sucesso");
                        this.router.navigate(["/kits"], { relativeTo: this.route });
                }
            )
        }
        else{
            
            this.kitDataService.storeKit(this.kitForm.value, 1)
            .subscribe(
                (kit:Kit) =>{
                    
                    this.kitDataService.updateEquipamentosToKit(kit.id, this.equipamentos_ids)
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
        this.location.back()
    }

    private initForm(kit:Kit){
        this.kitForm = new FormGroup({
            nome: new FormControl(kit.nome, Validators.required),
            descricao: new FormControl(kit.descricao)
        });
    }

    fetchEquipamentos() {
        this.equipamentoDataService
            .getAllEquipamentos()
            .subscribe((res: any) => {
                this.dataSource = new MatTableDataSource(res.equipamentos);
                this.dataSource.sort = this.sort;
                if(this.kit != null && this.kit.equipamentos != null) {
                    this.kit.equipamentos.forEach(equi => {
                        let equip_id = equi.id
                        for(let i of this.dataSource.data) {
                            if(i.id == equip_id) {
                                this.selection.select(i)
                                break
                            }
                        }
                    });
                }                

            });
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    } 
    
      /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
