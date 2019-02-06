import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Equipamento } from '../../_shared/models/equipamento.model';
import { Localidade } from 'src/app/_shared/models/localidade.model';
import { FormGroup, FormControl, Validators, PatternValidator } from '@angular/forms';
import { EstadoDataService } from 'src/app/_shared/services/estado-data.service';
import { EquipamentoDataService } from "src/app/_shared/services/equipamento-data.service";
import { Estado } from 'src/app/_shared/models/estado.model';
import { Municipio } from 'src/app/_shared/models/municipio.model';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';

@Component({
    selector: "app-equipamento-edit",
    templateUrl: "./equipamento-edit.component.html",
    styleUrls: ["./equipamento-edit.component.scss"]
})

export class EquipamentoEditComponent implements OnInit {
    estados: Estado[];
    municipios: Municipio[];
    estado:Estado = new Estado(null,"","")
    municipio:Municipio = new Municipio(null,"",null);
    localidade: Localidade = new Localidade("", "", "", "", "", "",null,null,this.estado,this.municipio);
    equipamento: Equipamento = new Equipamento("", "", "", "", "", "", "",null, this.localidade);
    equipamentoForm: FormGroup;
    equipamentoId: number;
    editmode = false;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private estadoDataService: EstadoDataService,
        private equipamentoDataService: EquipamentoDataService,
        private snackBarService: SnackBarService
    ) {}


    ngOnInit() {

        this.estadoDataService.getEstados().subscribe((estados: Estado[]) => {
            this.estados = estados;
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
                        this.fetchMunicipio(this.equipamento.localidade.estado.id);
                    });
            }else{
                this.initForm(this.equipamento);
            }
        })
    }

    onChange(e) {
        this.fetchMunicipio(e.value);
    }

    fetchMunicipio(id:number){
        let estado = this.estados.find(obj => obj.id == id);
        this.estadoDataService
            .getMunicipios(estado.sigla)
            .subscribe((municipios: Municipio[]) => {
                this.municipios = municipios;
                if(this.editmode){
                    this.equipamentoForm.patchValue({
                        localidade:{
                            municipio_id: this.equipamento.localidade.municipio.id
                        }
                    })
                }
            });
    }

    onAddEquipamento() {
        if(this.editmode){
            this.equipamentoDataService.updateEquipamento(this.equipamentoId, this.equipamentoForm.value)
            .subscribe(
                res => {
                    this.snackBarService.openSnackBar("Equipamento atualizada com sucesso");
                    this.router.navigate(["/equipamentos"], { relativeTo: this.route });
                }
            )
        }
        else{
            this.equipamentoDataService.storeEquipamento(this.equipamentoForm.value, 1)
            .subscribe(
                (equipamento:Equipamento) =>{
                    this.snackBarService.openSnackBar("Equipamento cadastrada com sucesso");
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
            'codigo_inep': new FormControl(equipamento.codigo_inep, Validators.minLength(8)),
            diretor: new FormControl(equipamento.diretor),
            email: new FormControl(equipamento.email, [Validators.required, Validators.email,]),
            url: new FormControl(
                equipamento.url,
                Validators.pattern(/https?:\/\/(www\.)?(?!www\.)([A-Za-z0-9\-@_~]+\.)[A-Za-z]{2,}(:[0-9]{2,5})?(\.[A-Za-z0-9\/_\-~?&=]+)*/)
            ),
            telefone: new FormControl(equipamento.telefone),
            localidade: new FormGroup({
                cep: new FormControl(equipamento.localidade.cep, Validators.required),
                logradouro: new FormControl(equipamento.localidade.logradouro, Validators.required),
                numero: new FormControl(equipamento.localidade.numero, Validators.required),
                complemento: new FormControl(equipamento.localidade.complemento),
                bairro: new FormControl(equipamento.localidade.bairro, Validators.required),
                estado_id: new FormControl(equipamento.localidade.estado.id, Validators.required),
                municipio_id: new FormControl(equipamento.localidade.municipio.id, Validators.required)
            })
        });
    }

    /*
        custom validator para email já cadastrado
        forbiddenEmail(control:FormControl):Promise<any> | Observable<any>{
        const promise = new Promise<any>((resolve, reject) =>{
            if(control.value ==="a"){
            resolve({"emailIsForbidden":true});
            }else{
                resolve(null);
            }
        })
        return promise;
    }*/

}
