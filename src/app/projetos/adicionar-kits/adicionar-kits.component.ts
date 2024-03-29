import { Component, OnInit } from '@angular/core';
import { KitDataService } from 'src/app/_shared/services/kit-data.service';
import { Kit } from 'src/app/_shared/models/kit.model';
import { NgForm } from '@angular/forms';
import { ProjetoDataService } from 'src/app/_shared/services/projeto-data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Projeto } from 'src/app/_shared/models/projeto.model';
import { Equipamento } from 'src/app/_shared/models/equipamento.model';
import { Etapa } from 'src/app/_shared/models/etapa.model';
import {Location} from '@angular/common';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';

@Component({
    selector: 'app-adicionar-kits',
    templateUrl: './adicionar-kits.component.html',
    styleUrls: ['./adicionar-kits.component.scss']
})
export class AdicionarKitsComponent implements OnInit {
    kit_id:number;
    kits: Kit[]=[];
    projetoId:number;
    projeto = Projeto.EMPTY_MODEL;

    constructor(
        private kitDataService:KitDataService,
        private projetoDataService:ProjetoDataService,
        private route:ActivatedRoute,
        private router:Router,
        private location: Location,
        private authService: AuthService,
        private snackBarService: SnackBarService
        ) { }

    ngOnInit() {

        if(!this.isAdmin) {
            this.snackBarService.openSnackBar("Requisição inválida.");
            this.router.navigate(["/"], { relativeTo: this.route });
            return
        }
        
        this.route.params.subscribe((params:Params)=>{
            this.projetoId = +params["id"];
            this.projetoDataService.getProjeto(this.projetoId).subscribe((projeto:Projeto)=>{
                this.projeto = projeto;
                this.kit_id = this.projeto.kit_id;
            });
        });

        this.kitDataService.getAllKits().subscribe((res: any)=>{
            this.kits = res.kits;
        });
    }

    get isAdmin() {
        let usuarioAutenticado = this.authService.getCurrentUser();
        let classe = usuarioAutenticado.unidade.classe;
        return classe == "admin" || classe == "tvescola" || classe == "mec";
    }

    onSubmit(form: NgForm) {
        let kitIdSelecionado = form.value.kit_id;
        if(this.projeto.kit_id) {

            if(kitIdSelecionado != this.projeto.kit_id && confirm("Ao modificar o kit de um projeto você estará cancelando as etapas subsequentes. Deseja continuar?")) {
                this.projetoDataService.deleteKit(this.projetoId, this.projeto.kit_id).subscribe(res=>{
                    this.projetoDataService.storeKit(this.projetoId, kitIdSelecionado).subscribe(res => {
                        this.router.navigate(["../etapa-envio"], { relativeTo: this.route });
                    });
                });
            }
        }else{
            this.projetoDataService.storeKit(this.projetoId, kitIdSelecionado).subscribe(res=>{
                this.router.navigate(["../etapa-envio"], { relativeTo: this.route });
            });
        }
    }

    onCancel() {
        this.location.back()
    }



}
