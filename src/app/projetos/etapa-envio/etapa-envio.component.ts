import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';
import { ProjetoDataService } from 'src/app/_shared/services/projeto-data.service';
import { UnidadeDataService } from 'src/app/_shared/services/unidade-data.service';
import { Unidade } from 'src/app/_shared/models/unidade.model';
import { Projeto } from 'src/app/_shared/models/projeto.model';
import { Equipamento } from 'src/app/_shared/models/equipamento.model';
import { MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Tarefa } from 'src/app/_shared/models/tarefa.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EquipamentoProjeto } from 'src/app/_shared/models/equipamentoProjeto.model';
import { Etapa } from 'src/app/_shared/models/etapa.model';
import { ProjetoEditComponent } from '../projeto-edit/projeto-edit.component';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';
import { AuthService } from 'src/app/_shared/services/auth.service';
import {Location} from '@angular/common';

@Component({
    selector: 'app-etapa-envio',
    templateUrl: './etapa-envio.component.html',
    styleUrls: ['./etapa-envio.component.scss']
})
export class EtapaEnvioComponent implements OnInit, OnDestroy {
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ["select","nome", "tipoEquipamento"];
    dataSource;
    unidades:Unidade[];
    projetoId:number;
    //etapaEnvioId:number;
    etapaEnvio = Etapa.EMPTY_MODEL;
    //projeto: Projeto = Projeto.EMPTY_MODEL;
    equipPendentes:Equipamento[];
    selection = new SelectionModel<Equipamento>(true, []);
    envioForm:FormGroup;
    navigationSubscription;
    minDate: Date
    maxDate: Date

    constructor(
        private route:ActivatedRoute,
        private router:Router,
        private projetoDataService:ProjetoDataService,
        private unidadeDataService:UnidadeDataService,
        private snackBarService: SnackBarService,
        private authService: AuthService,
        private location: Location
    ) {
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            // If it is a NavigationEnd event re-initalise the component
            if (e instanceof NavigationEnd) {
              this.initialize();
            }
          });
     }

    ngOnInit() {
        this.initialize()
    }

    ngOnDestroy() {
        // avoid memory leaks here by cleaning up after ourselves. If we  
        // don't then we will continue to run our initialiseInvites()   
        // method on every navigationEnd event.
        if (this.navigationSubscription) {  
           this.navigationSubscription.unsubscribe();
        }
    }

    initialize() {
        
        this.route.params.subscribe((params: Params) => {
            this.projetoId = +params["id"];
            this.initForm();
            this.fetchEquipPendentes();
            this.projetoDataService.getProjeto(this.projetoId).subscribe((projeto: Projeto) => {
                this.minDate = new Date(projeto.data_inicio_previsto)
                this.minDate.setDate(this.minDate.getDate() + 1)
                this.maxDate = new Date(projeto.data_fim_previsto)
                this.maxDate.setDate(this.maxDate.getDate() + 1)
            })
            this.projetoDataService.getEtapaEnvio(this.projetoId).subscribe((etapa: Etapa) => {
                this.etapaEnvio = etapa;
            })
        });
        this.fetchEmpresas();
    }

    /**
     * Atualiza a janela apos o envio de uma tarefa. Caso não existem mais equipamentos disponíveis para 
     * envio, altera o fluxo para a tela de instalação. 
     */
    updateTarefaEnvio() {
        this.projetoDataService.getEquipDisponiveisEnvio(this.projetoId)
        .subscribe((equipamentos: EquipamentoProjeto[]) => {
            this.dataSource = new MatTableDataSource(equipamentos);
            this.dataSource.sort = this.sort;
            if(equipamentos && equipamentos.length) {
                this.projetoDataService.getEtapaEnvio(this.projetoId).subscribe((etapa: Etapa) => {
                    this.etapaEnvio = etapa;
                    this.router.navigate(["/projetos/"+this.projetoId+"/etapa-envio"], { relativeTo: this.route });
                    this.snackBarService.openSnackBar("Entrega cadastrada com sucesso.")
                }, erro => {
                    console.log(erro)
                })
            } else {
                this.router.navigate(["../etapa-instalacao"], { relativeTo: this.route });
                this.snackBarService.openSnackBar("Entregas cadastradas.")
            }
        });
    }

    onAddEnvio(){
        let tarefaEnvio = Tarefa.EMPTY_MODEL;
        tarefaEnvio.equipamentos_projeto_ids = [];
        this.selection.selected.forEach(row =>
            tarefaEnvio.equipamentos_projeto_ids.push(row.id)
        );
        tarefaEnvio.numero = this.envioForm.value.numero;
        tarefaEnvio.usuario_id = this.authService.getCurrentUser().id;
        tarefaEnvio.unidade_responsavel_id = this.envioForm.value.unidade_responsavel_id;
        tarefaEnvio.data_inicio_prevista = this.envioForm.value.data_inicio_prevista;
        tarefaEnvio.data_fim_prevista = this.envioForm.value.data_fim_prevista;
        if (this.etapaEnvio.id) {
            tarefaEnvio.etapa_id = this.etapaEnvio.id;
        }
            
        tarefaEnvio.etapa_id = null;
        this.projetoDataService.storeTarefaEnvio(this.projetoId,tarefaEnvio).subscribe(res =>{
            this.updateTarefaEnvio()
        },
        erro => {
            console.log(erro)
        })
    }

    onCancel() {
        this.location.back()
    }

    fetchEmpresas(){
        this.unidadeDataService.getEmpresas().subscribe((unidades:Unidade[])=>{
            this.unidades = unidades;
        })
    }

    private initForm() {
        this.envioForm = new FormGroup({
            unidade_responsavel_id: new FormControl('', Validators.required),
            numero: new FormControl(''),
            data_inicio_prevista: new FormControl('', Validators.required),
            data_fim_prevista: new FormControl('', Validators.required)
        });
    }

    fetchEquipPendentes(){
        this.selection.clear()    
        this.projetoDataService.getEquipDisponiveisEnvio(this.projetoId)
            .subscribe((equipamentos: EquipamentoProjeto[]) => {
                this.dataSource = new MatTableDataSource(equipamentos);
                this.dataSource.sort = this.sort;
        });
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }



}
