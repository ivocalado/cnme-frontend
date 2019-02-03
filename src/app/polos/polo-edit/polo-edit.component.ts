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

@Component({
    selector: "app-polo-edit",
    templateUrl: "./polo-edit.component.html",
    styleUrls: ["./polo-edit.component.scss"]
})
export class PoloEditComponent implements OnInit {
    estados: Estado[];
    municipios: Municipio[];
    estado: Estado = new Estado(null, "", "")
    municipio: Municipio = new Municipio(null, "", null);
    localidade: Localidade = new Localidade("", "", "", "", "", "", null, null, this.estado, this.municipio);
    unidade: Unidade = new Unidade("", "", "", "", "", "", "", null, this.localidade);
    poloForm: FormGroup;
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
        this.route.params.subscribe((params: Params) => {
            this.unidadeId = +params["id"];
            this.editmode = params["id"] != null;
            console.log("editMode: " + this.editmode);

            if (this.editmode) {
                this.unidadeDataService
                    .getUnidade(this.unidadeId)
                    .subscribe((unidade: Unidade) => {
                        this.unidade = unidade;
                        this.initForm(this.unidade);
                        this.fetchMunicipio(this.unidade.localidade.estado.id);
                    });
            } else {
                this.initForm(this.unidade);
            }
        });
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
                    this.poloForm.patchValue({
                        localidade: {
                            municipio_id: this.unidade.localidade.municipio.id
                        }
                    });
                }
            });
    }

    onAddPolo() {
        if (this.editmode) {
            this.unidadeDataService
                .updateUnidade(this.unidadeId, this.poloForm.value)
                .subscribe(res => {
                    this.snackBarService.openSnackBar(
                        "Polo atualizado com sucesso"
                    );
                    this.router.navigate(["/polos"], {
                        relativeTo: this.route
                    });
                });
        } else {
            this.unidadeDataService.storeUnidade(this.poloForm.value, 1)
                .subscribe(
                    (unidade: Unidade) => {
                        this.snackBarService.openSnackBar(
                            "Polo cadastrado com sucesso"
                        );
                        this.router.navigate(["/polos"], {
                            relativeTo: this.route
                        });
                    },
                    error => {
                        this.poloForm.setErrors = error;
                        const fields = Object.keys(error || {});
                        fields.forEach(field => {
                            this.poloForm
                                .get(field)
                                .setErrors({ serverside: error[field] });
                        });
                    }
                );
        }
    }

    onCancel() {
        this.router.navigate(["/polos"], { relativeTo: this.route });
    }

    private initForm(unidade: Unidade) {
        this.poloForm = new FormGroup({
            nome: new FormControl(unidade.nome, Validators.required),
            codigo_inep: new FormControl(
                unidade.codigo_inep,
                Validators.minLength(8)
            ),
            diretor: new FormControl(unidade.diretor),
            email: new FormControl(unidade.email, [
                Validators.required,
                Validators.email
            ]),
            url: new FormControl(
                unidade.url,
                Validators.pattern(
                    /https?:\/\/(www\.)?(?!www\.)([A-Za-z0-9\-@_~]+\.)[A-Za-z]{2,}(:[0-9]{2,5})?(\.[A-Za-z0-9\/_\-~?&=]+)*/
                )
            ),
            telefone: new FormControl(unidade.telefone),
            localidade: new FormGroup({
                cep: new FormControl(
                    unidade.localidade.cep,
                    Validators.required
                ),
                logradouro: new FormControl(
                    unidade.localidade.logradouro,
                    Validators.required
                ),
                numero: new FormControl(
                    unidade.localidade.numero,
                    Validators.required
                ),
                complemento: new FormControl(unidade.localidade.complemento),
                bairro: new FormControl(
                    unidade.localidade.bairro,
                    Validators.required
                ),
                estado_id: new FormControl(
                    unidade.localidade.estado.id,
                    Validators.required
                ),
                municipio_id: new FormControl(
                    unidade.localidade.municipio.id,
                    Validators.required
                )
            })
        });
    }
}
