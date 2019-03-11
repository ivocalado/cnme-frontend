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
    selector: "app-mec-edit",
    templateUrl: "./mec-edit.component.html",
    styleUrls: ["./mec-edit.component.scss"]
})
export class MecEditComponent implements OnInit {
    estados: Estado[];
    municipios: Municipio[];
    unidade: Unidade = Unidade.EMPTY_MODEL;
    mecForm: FormGroup;
    unidadeId: number;
    editmode = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private estadoDataService: EstadoDataService,
        private unidadeDataService: UnidadeDataService,
        private snackBarService: SnackBarService,
        private location: Location
    ) {}

    ngOnInit() {
        this.estadoDataService.getEstados().subscribe((estados: Estado[]) => {
            this.estados = estados;
            this.unidadeDataService
            .getMec()
            .subscribe((unidade: Unidade) => {
                this.unidade = unidade;
                this.initForm(this.unidade);
                this.fetchMunicipio(this.unidade.localidade.estado.id);
            });
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
                    this.mecForm.patchValue({
                        localidade: {
                            municipio_id: this.unidade.localidade.municipio.id
                        }
                    });
                }
            });
    }

    onAddMec() {
        this.unidadeDataService
            .updateUnidade(this.unidadeId, this.mecForm.value)
            .subscribe(res => {
                this.snackBarService.openSnackBar(
                    "MEC atualizado com sucesso"
                );
                this.router.navigate(["/mec/detalhes"], {
                    relativeTo: this.route
                });
            });
    }

    onCancel() {
        this.location.back()
    }

    private initForm(unidade: Unidade) {
        this.mecForm = new FormGroup({
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
