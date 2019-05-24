import { Component, OnInit } from '@angular/core';
import { Estado } from 'src/app/_shared/models/estado.model';
import { Municipio } from 'src/app/_shared/models/municipio.model';
import { Localidade } from 'src/app/_shared/models/localidade.model';
import { Unidade } from 'src/app/_shared/models/unidade.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EstadoDataService } from 'src/app/_shared/services/estado-data.service';
import { UnidadeDataService } from 'src/app/_shared/services/unidade-data.service';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';
import {Location} from '@angular/common';

@Component({
    selector: 'app-empresa-edit',
    templateUrl: './empresa-edit.component.html',
    styleUrls: ['./empresa-edit.component.scss']
})
export class EmpresaEditComponent implements OnInit {
    estados: Estado[];
    municipios: Municipio[];
    unidade: Unidade = Unidade.EMPTY_MODEL;
    empresaForm: FormGroup;
    unidadeId: number;
    editmode = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private estadoDataService: EstadoDataService,
        private unidadeDataService: UnidadeDataService,
        private snackBarService: SnackBarService,
        private location: Location
    ) { }

    ngOnInit() {
        this.estadoDataService.getEstados().subscribe((estados: Estado[]) => {
            this.estados = estados;
        });

        this.route.params.subscribe((params: Params) => {
            this.unidadeId = +params["id"];
            this.editmode = params["id"] != null;
            console.log("editMode: " + this.editmode);

            if (this.editmode) {
                this.unidadeDataService.getUnidade(this.unidadeId)
                    .subscribe((unidade: Unidade) => {
                        this.unidade = unidade;
                        this.initForm(this.unidade);
                        this.fetchMunicipio(this.unidade.localidade.estado.id);
                    });
            } else {
                this.initForm(this.unidade);
            }
        })
    }

    onChange(e) {
        this.fetchMunicipio(e.value);
    }

    fetchMunicipio(id: number) {
        let estado = this.estados.find(obj => obj.id == id);
        this.estadoDataService
            .getMunicipios(estado.sigla)
            .subscribe((municipios: Municipio[]) => {
                this.municipios = municipios;
                if (this.editmode) {
                    this.empresaForm.patchValue({
                        localidade: {
                            municipio_id: this.unidade.localidade.municipio.id
                        }
                    })
                }
            });
    }

    onAddEmpresa() {
        if (this.editmode) {
            this.unidadeDataService.updateUnidade(this.unidadeId, this.empresaForm.value)
                .subscribe(
                    res => {
                        this.snackBarService.openSnackBar("Empresa atualizada com sucesso");
                        this.router.navigate(["/empresas"], { relativeTo: this.route });
                    }
                )
        }
        else {
            this.unidadeDataService.storeUnidade(this.empresaForm.value, 4, "empresa")
                .subscribe(
                    (unidade: Unidade) => {
                        this.snackBarService.openSnackBar("Empresa cadastrada com sucesso");
                        this.router.navigate(["/empresas"], { relativeTo: this.route });
                    },
                    error => {
                        this.empresaForm.setErrors = error;
                        const fields = Object.keys(error || {});
                        fields.forEach((field) => {
                            this.empresaForm.get(field).setErrors({ serverside: error[field] });
                        })
                    }
                );
        }
    }

    onCancel() {
        this.location.back()
    }

    private initForm(unidade: Unidade) {
        this.empresaForm = new FormGroup({
            nome: new FormControl(unidade.nome, Validators.required),
            'codigo_inep': new FormControl(unidade.codigo_inep, Validators.minLength(8)),
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

    consultarCep() {
        let cep: string = this.empresaForm.controls['localidade'].value.cep
        console.log(cep)
        console.log("COnsultar cep")
        this.unidadeDataService.consultarCep(cep).subscribe((res: any) => {
            let est_id: number = this.findEstadoIdBySigla(res.estado)
            this.estadoDataService
            .getMunicipios(res.estado)
            .subscribe((municipios: Municipio[]) => {
                this.municipios = municipios;
                    this.empresaForm.patchValue({
                    localidade: {
                        municipio_id: this.findMunicipioIdByNome(res.cidade)
                    }
                });
            });
            this.empresaForm.controls['localidade'].patchValue({
                bairro: res.bairro,
                cep: res.cep,
                estado_id: est_id,
                logradouro: res.logradouro
            })
            this.snackBarService.openSnackBar("Endereço carregado com sucesso!")
        }, error => {
            this.snackBarService.openSnackBar("CEP não encontrado!")
        })
    }

    get isCepInformed() {
        return this.empresaForm.controls['localidade'].value.cep
    }

    findEstadoIdBySigla(sigla: string) {
        console.log("findEstadoIdBySigla")
        for(let estado of this.estados) {
            if(estado.sigla == sigla)
                return estado.id
        }
        return -1
    }

    findMunicipioIdByNome(nome: string) {
        console.log("findMunicipioIdByNome")
        for(let municipio of this.municipios) {
            if(municipio.nome == nome)
                return municipio.id
        }
        return -1
    }

}
