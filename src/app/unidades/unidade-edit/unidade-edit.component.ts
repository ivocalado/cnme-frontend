import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Unidade } from '../../shared/models/unidade.model';
import { Localidade } from 'src/app/shared/models/localidade.model';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { EstadoDataService } from 'src/app/shared/services/estado-data.service';
import { UnidadeDataService } from "src/app/shared/services/unidade-data.service";
import { Estado } from 'src/app/shared/models/estado.model';
import { Municipio } from 'src/app/shared/models/municipio.model';
import { SnackBarService } from 'src/app/shared/helpers/snakbar.service';

@Component({
    selector: "app-unidade-edit",
    templateUrl: "./unidade-edit.component.html",
    styleUrls: ["./unidade-edit.component.scss"]
})

export class UnidadeEditComponent implements OnInit {
    estados: Estado[];
    municipios: Municipio[];
    estado:Estado = new Estado(null,"","")
    municipio:Municipio = new Municipio(null,"",null);
    localidade: Localidade = new Localidade("", "", "", "", "", "",null,null,this.estado,this.municipio);
    unidade: Unidade = new Unidade("", "", "", "", "", "", "",null, this.localidade);
    unidadeForm: FormGroup;
    unidadeId: number;
    editmode = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private estadoDataService: EstadoDataService,
        private unidadeDataService: UnidadeDataService,
        private snackBarService: SnackBarService
    ) {}

    ngOnInit() {

        this.estadoDataService.getEstados().subscribe((estados: Estado[]) => {
            this.estados = estados;
        });

        this.route.params.subscribe((params:Params) =>{
            this.unidadeId = +params["id"];
            this.editmode = params["id"] != null;
            console.log("editMode: "+this.editmode);

            if (this.editmode) {
                this.unidadeDataService.getUnidade(this.unidadeId)
                    .subscribe((unidade:Unidade) => {
                        this.unidade = unidade;
                        this.initForm(this.unidade);
                        this.fetchMunicipio(this.unidade.localidade.estado.id);
                    });
            }else{
                this.initForm(this.unidade);
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
                    this.unidadeForm.patchValue({
                        localidade:{
                            municipio_id: this.unidade.localidade.municipio.id
                        }
                    })
                }
            });
    }

    onAddUnidade() {
        if(this.editmode){
            this.unidadeDataService.updateUnidade(this.unidadeId, this.unidadeForm.value)
            .subscribe(
                res => {
                    this.snackBarService.openSnackBar("Unidade editada com sucesso");
                    this.router.navigate(["/unidades"], { relativeTo: this.route });
                }
            )
        }
        else{
            this.unidadeDataService.storeUnidade(this.unidadeForm.value)
            .subscribe(
                (unidade:Unidade) =>{
                    this.snackBarService.openSnackBar("Unidade cadastrada com sucesso");
                    this.router.navigate(["/unidades"], { relativeTo: this.route });
                },
                error => {
                    this.unidadeForm.setErrors = error;
                    const fields = Object.keys(error || {});
                    fields.forEach((field) => {
                        this.unidadeForm.get(field).setErrors({ serverside: error[field]});
                    })
                }
            );
        }
    }

    onCancel() {
        this.router.navigate(["/unidades"], { relativeTo: this.route });
    }

    private initForm(unidade:Unidade){
        this.unidadeForm = new FormGroup({
            nome: new FormControl(unidade.nome, Validators.required),
            codigo_inep: new FormControl(unidade.codigo_inep, Validators.maxLength(8)),
            diretor: new FormControl(unidade.diretor),
            email: new FormControl(unidade.email, [Validators.required, Validators.email,]),
            url: new FormControl(
                unidade.url,
                Validators.pattern(/https?:\/\/(www\.)?(?!www\.)([A-Za-z0-9\-@_~]+\.)[A-Za-z]{2,}(:[0-9]{2,5})?(\.[A-Za-z0-9\/_\-~?&=]+)*/)
            ),
            telefone: new FormControl(unidade.telefone),
            localidade: new FormGroup({
                cep: new FormControl(unidade.localidade.cep, Validators.required),
                logradouro: new FormControl(unidade.localidade.logradouro, Validators.required),
                numero: new FormControl(unidade.localidade.numero, Validators.required),
                complemento: new FormControl(unidade.localidade.complemento),
                bairro: new FormControl(unidade.localidade.bairro, Validators.required),
                estado_id: new FormControl(unidade.localidade.estado.id, Validators.required),
                municipio_id: new FormControl(unidade.localidade.municipio.id, Validators.required)
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
