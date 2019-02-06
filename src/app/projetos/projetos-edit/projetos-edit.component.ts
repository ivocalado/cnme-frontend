import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface PeriodicElement {
    equipamento: string;
    cod_rastreio: string;
    empresa: string;
    status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { equipamento: "equipamento", cod_rastreio: 'CPH2233398BR', empresa: "nome da empresa", status: 'entregue' },
    { equipamento: "equipamento", cod_rastreio: 'CPH2233398BR', empresa: "nome da empresa", status: 'enviado' },
    { equipamento: "equipamento", cod_rastreio: 'CPH2233398BR', empresa: "nome da empresa", status: 'enviado' },
    { equipamento: "equipamento", cod_rastreio: 'CPH2233398BR', empresa: "nome da empresa", status: 'enviado' }
];

@Component({
    selector: "app-projetos-edit",
    templateUrl: "./projetos-edit.component.html",
    styleUrls: ["./projetos-edit.component.scss"]
})
export class ProjetosEditComponent implements OnInit {
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;
    descricao="";

    displayedColumns: string[] = [
        "equipamento",
        "cod_rastreio",
        "empresa",
        "status"
    ];
    dataSource = ELEMENT_DATA;

    constructor(private _formBuilder: FormBuilder) {}

    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ["", Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ["", Validators.required]
        });
        this.thirdFormGroup = this._formBuilder.group({
            thirdCtrl: ["", Validators.required]
        });
    }
}
