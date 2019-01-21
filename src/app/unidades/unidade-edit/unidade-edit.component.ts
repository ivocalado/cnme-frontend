import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { EstadoService, Estado } from 'src/app/shared/estado.service';
import { Unidade } from '../unidade.model';
import { Localidade } from 'src/app/shared/localidade.model';
import { NgForm } from '@angular/forms';
import { EstadoDataService } from 'src/app/shared/estado-data.service';
import { Estado } from 'src/app/shared/estado.model';
import { Municipio } from 'src/app/shared/municipio.model';

@Component({
    selector: "app-unidade-edit",
    templateUrl: "./unidade-edit.component.html",
    styleUrls: ["./unidade-edit.component.scss"]
})
export class UnidadeEditComponent implements OnInit {
    estados: Estado[];
    municipios: Municipio[];
    localidade: Localidade = new Localidade("", "", "", "", "", "", "");
    unidade: Unidade = new Unidade("", "", "", "", "", "", "", this.localidade);
    editmode = false;

    constructor(
        private route: ActivatedRoute,
        //private estadoService: EstadoService,
        private router: Router,
        private estadosDataService: EstadoDataService
    ) {}

    ngOnInit() {
        this.estadosDataService.getEstados().subscribe((estados: Estado[]) => {
            this.estados = estados;
        });
    }

    onChange(e) {
        console.log("e:"+e.value);
        this.estadosDataService.getMunicipios(e.value).subscribe((municipios: Municipio[])=>{
            this.municipios = municipios;
        })
    }

    onAddUnidade(form: NgForm) {
        this.router.navigate(["/unidades"], { relativeTo: this.route });
    }

    onCancel() {
        this.router.navigate(["/unidades"], { relativeTo: this.route });
    }
}
