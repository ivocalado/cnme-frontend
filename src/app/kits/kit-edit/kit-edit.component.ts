import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Kit } from '../../_shared/models/kit.model';
import { Localidade } from 'src/app/_shared/models/localidade.model';
import { FormGroup, FormControl, Validators, PatternValidator } from '@angular/forms';
import { EstadoDataService } from 'src/app/_shared/services/estado-data.service';
import { KitDataService } from "src/app/_shared/services/kit-data.service";
import { Estado } from 'src/app/_shared/models/estado.model';
import { Municipio } from 'src/app/_shared/models/municipio.model';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';

@Component({
    selector: "app-kit-edit",
    templateUrl: "./kit-edit.component.html",
    styleUrls: ["./kit-edit.component.scss"]
})

export class KitEditComponent implements OnInit {
    estados: Estado[];
    municipios: Municipio[];
    estado:Estado = new Estado(null,"","")
    municipio:Municipio = new Municipio(null,"",null);
    localidade: Localidade = new Localidade("", "", "", "", "", "",null,null,this.estado,this.municipio);
    kit: Kit = new Kit("", "", "", "", "", "", "",null, this.localidade);
    kitForm: FormGroup;
    kitId: number;
    editmode = false;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private estadoDataService: EstadoDataService,
        private kitDataService: KitDataService,
        private snackBarService: SnackBarService
    ) {}


    ngOnInit() {

        this.estadoDataService.getEstados().subscribe((estados: Estado[]) => {
            this.estados = estados;
        });

        this.route.params.subscribe((params:Params) =>{
            this.kitId = +params["id"];
            this.editmode = params["id"] != null;
            console.log("editMode: "+this.editmode);

            if (this.editmode) {
                this.kitDataService.getKit(this.kitId)
                    .subscribe((kit:Kit) => {
                        this.kit = kit;
                        this.initForm(this.kit);
                        this.fetchMunicipio(this.kit.localidade.estado.id);
                    });
            }else{
                this.initForm(this.kit);
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
                    this.kitForm.patchValue({
                        localidade:{
                            municipio_id: this.kit.localidade.municipio.id
                        }
                    })
                }
            });
    }

    onAddKit() {
        if(this.editmode){
            this.kitDataService.updateKit(this.kitId, this.kitForm.value)
            .subscribe(
                res => {
                    this.snackBarService.openSnackBar("Kit atualizada com sucesso");
                    this.router.navigate(["/kits"], { relativeTo: this.route });
                }
            )
        }
        else{
            this.kitDataService.storeKit(this.kitForm.value, 1)
            .subscribe(
                (kit:Kit) =>{
                    this.snackBarService.openSnackBar("Kit cadastrada com sucesso");
                    this.router.navigate(["/kits"], { relativeTo: this.route });
                },
                error => {
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
            'codigo_inep': new FormControl(kit.codigo_inep, Validators.minLength(8)),
            diretor: new FormControl(kit.diretor),
            email: new FormControl(kit.email, [Validators.required, Validators.email,]),
            url: new FormControl(
                kit.url,
                Validators.pattern(/https?:\/\/(www\.)?(?!www\.)([A-Za-z0-9\-@_~]+\.)[A-Za-z]{2,}(:[0-9]{2,5})?(\.[A-Za-z0-9\/_\-~?&=]+)*/)
            ),
            telefone: new FormControl(kit.telefone),
            localidade: new FormGroup({
                cep: new FormControl(kit.localidade.cep, Validators.required),
                logradouro: new FormControl(kit.localidade.logradouro, Validators.required),
                numero: new FormControl(kit.localidade.numero, Validators.required),
                complemento: new FormControl(kit.localidade.complemento),
                bairro: new FormControl(kit.localidade.bairro, Validators.required),
                estado_id: new FormControl(kit.localidade.estado.id, Validators.required),
                municipio_id: new FormControl(kit.localidade.municipio.id, Validators.required)
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
