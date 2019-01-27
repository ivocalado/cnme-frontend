import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { EstadoService, Estado } from 'src/app/shared/estado.service';
import { Unidade } from '../../shared/models/unidade.model';
import { Localidade } from 'src/app/shared/models/localidade.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { EstadoDataService } from 'src/app/shared/services/estado-data.service';
import { UnidadeDataService } from "src/app/shared/services/unidade-data.service";
import { Estado } from 'src/app/shared/models/estado.model';
import { Municipio } from 'src/app/shared/models/municipio.model';

@Component({
    selector: "app-unidade-edit",
    templateUrl: "./unidade-edit.component.html",
    styleUrls: ["./unidade-edit.component.scss"]
})
export class UnidadeEditComponent implements OnInit {
    estados: Estado[];
    municipios: Municipio[];
    localidade: Localidade = new Localidade("", "", "", "", "", "", "",null,null);
    unidade: Unidade = new Unidade("", "", "", "", "", "", "",null, this.localidade);
    editmode = false;
    unidadeForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        //private estadoService: EstadoService,
        private router: Router,
        private estadoDataService: EstadoDataService,
        private unidadeDataService:UnidadeDataService
    ) {}

    ngOnInit() {
        this.estadoDataService.getEstados().subscribe((estados: Estado[]) => {
            this.estados = estados;
        });
        //init form
        this.unidadeForm = new FormGroup({
            nome: new FormControl(null, Validators.required),
            codigo_inep: new FormControl(null, Validators.maxLength(8)),
            diretor: new FormControl(null),
            email: new FormControl(null, [Validators.required,Validators.email]),
            url: new FormControl(null),
            telefone: new FormControl(null),
            localidade: new FormGroup({
                cep: new FormControl(null, Validators.required),
                logradouro: new FormControl(null, Validators.required),
                numero: new FormControl(null, Validators.required),
                complemento: new FormControl(null),
                bairro: new FormControl(null, Validators.required),
                estado_id: new FormControl(null, Validators.required),
                municipio_id: new FormControl(null, Validators.required)
            })
        });
    }

    onChange(e) {
        console.log(e.value)
        let estado = this.estados.find(obj => obj.id == e.value);
        console.log(estado);
        this.estadoDataService
            .getMunicipios(estado.sigla)
            .subscribe((municipios: Municipio[]) => {
                this.municipios = municipios;
            });
    }

    onAddUnidade() {
        //this.router.navigate(["/unidades"], { relativeTo: this.route });
        this.unidadeDataService.storeUnidade(this.unidadeForm.value).subscribe((unidade:Unidade) =>{
            console.log(unidade);
        })

    }

    onCancel() {
        this.router.navigate(["/unidades"], { relativeTo: this.route });
    }
}
