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

@Component({
    selector: 'app-planejamento-envio',
    templateUrl: './planejamento-envio.component.html',
    styleUrls: ['./planejamento-envio.component.scss']
})
export class PlanejamentoEnvioComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ["select","nome", "tipoEquipamento"];
    dataSource;
    unidades:Unidade[];
    projetoId:number;
    projeto: Projeto = Projeto.EMPTY_MODEL;
    equipPendentes:Equipamento[];
    selection = new SelectionModel<Equipamento>(true, []);
    envioForm:FormGroup;
    tarefaEnvio=Tarefa.EMPTY_MODEL;

    constructor(
        private route:ActivatedRoute,
        private router:Router,
        private projetoDataService:ProjetoDataService,
        private unidadeDataService:UnidadeDataService
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.projetoId = +params["id"];
            this.projetoDataService.getProjeto(this.projetoId).subscribe((projeto: Projeto) => {
                this.projeto = projeto;

                this.projetoDataService.getEquipDisponiveisEnvio(this.projetoId)
                .subscribe((equipamentos:EquipamentoProjeto[]) =>{
                    this.dataSource = new MatTableDataSource(equipamentos);
                    this.dataSource.sort = this.sort;
                    this.initForm(this.tarefaEnvio);
                    console.log(equipamentos);
                });
            })
        });
        this.fetchEmpersas();
    }

    onAddEnvio(){
        this.tarefaEnvio.equipamentos_projeto_ids = [];
        this.selection.selected.forEach(row =>
            this.tarefaEnvio.equipamentos_projeto_ids.push(row.id)
        );
        this.tarefaEnvio.numero = this.envioForm.value.numero;
        this.tarefaEnvio.usuario_id = 1;
        this.tarefaEnvio.unidade_responsavel_id = this.envioForm.value.unidade_responsavel_id;
        this.tarefaEnvio.data_inicio_prevista = this.envioForm.value.data_inicio_prevista;
        this.tarefaEnvio.data_fim_prevista = this.envioForm.value.data_fim_prevista;
        //console.log(this.tarefaEnvio);
        this.projetoDataService.storeTarefa(this.projetoId,this.tarefaEnvio).subscribe(res =>{
            this.router.navigate(["/projetos"], { relativeTo: this.route });
        })
    }

    onCancel() {
        this.router.navigate(["/projetos"], { relativeTo: this.route });
    }

    fetchEmpersas(){
        this.unidadeDataService.getEmpresas().subscribe((unidades:Unidade[])=>{
            this.unidades = unidades;
        })
    }

    private initForm(tarefaEnvio:Tarefa) {
        this.envioForm = new FormGroup({
            unidade_responsavel_id: new FormControl(tarefaEnvio.unidade_responsavel_id, Validators.required),
            numero: new FormControl(tarefaEnvio.numero, Validators.required),
            data_inicio_prevista: new FormControl(tarefaEnvio.data_inicio_prevista, Validators.required),
            data_fim_prevista: new FormControl(tarefaEnvio.data_fim_prevista, Validators.required)
        });
    }

    fetchEquipPendentes(){
        //this.projeto.equipamentos_projeto
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
