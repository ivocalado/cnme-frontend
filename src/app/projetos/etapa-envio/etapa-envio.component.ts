import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
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

@Component({
    selector: 'app-etapa-envio',
    templateUrl: './etapa-envio.component.html',
    styleUrls: ['./etapa-envio.component.scss']
})
export class EtapaEnvioComponent implements OnInit {
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

    constructor(
        private route:ActivatedRoute,
        private router:Router,
        private projetoDataService:ProjetoDataService,
        private unidadeDataService:UnidadeDataService
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.projetoId = +params["id"];
            //console.log(this.etapaEnvioId);
            this.initForm();
            this.fetchEquipPendentes();
            this.projetoDataService.getEtapaEnvio(this.projetoId).subscribe((etapa: Etapa) => {
                this.etapaEnvio = etapa;
            })
        });
        this.fetchEmpersas();
    }

    onAddEnvio(){
        let tarefaEnvio = Tarefa.EMPTY_MODEL;
        tarefaEnvio.equipamentos_projeto_ids = [];
        this.selection.selected.forEach(row =>
            tarefaEnvio.equipamentos_projeto_ids.push(row.id)
        );
        tarefaEnvio.numero = this.envioForm.value.numero;
        tarefaEnvio.usuario_id = 1;
        tarefaEnvio.unidade_responsavel_id = this.envioForm.value.unidade_responsavel_id;
        tarefaEnvio.data_inicio_prevista = this.envioForm.value.data_inicio_prevista;
        tarefaEnvio.data_fim_prevista = this.envioForm.value.data_fim_prevista;
        if (this.etapaEnvio.id)
            tarefaEnvio.etapa_id = this.etapaEnvio.id;
        tarefaEnvio.etapa_id = null;
        this.projetoDataService.storeTarefa(this.projetoId,tarefaEnvio).subscribe(res =>{
            //window.location.reload();
            this.router.navigate(["/projetos/editar/"+this.projetoId], { relativeTo: this.route });
        })
    }

    onCancel() {
        this.router.navigate(["/projetos/editar/"+this.projetoId+"/step/2"], { relativeTo: this.route });
    }

    fetchEmpersas(){
        this.unidadeDataService.getEmpresas().subscribe((unidades:Unidade[])=>{
            this.unidades = unidades;
        })
    }

    private initForm() {
        this.envioForm = new FormGroup({
            unidade_responsavel_id: new FormControl('', Validators.required),
            numero: new FormControl('', Validators.required),
            data_inicio_prevista: new FormControl('', Validators.required),
            data_fim_prevista: new FormControl('', Validators.required)
        });
    }

    fetchEquipPendentes(){
        this.projetoDataService.getEquipDisponiveisEnvio(this.projetoId)
            .subscribe((equipamentos: EquipamentoProjeto[]) => {
                this.dataSource = new MatTableDataSource(equipamentos);
                this.dataSource.sort = this.sort;
                console.log(this.selection.selected);
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
