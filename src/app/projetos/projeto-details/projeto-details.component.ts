import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProjetoDataService } from '../../_shared/services/projeto-data.service';
import { Projeto } from '../../_shared/models/projeto.model';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Etapa } from 'src/app/_shared/models/etapa.model';
import { EquipamentoProjeto } from 'src/app/_shared/models/equipamentoProjeto.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-projeto-details',
  templateUrl: './projeto-details.component.html',
  styleUrls: ['./projeto-details.component.scss']
})
export class ProjetoDetailsComponent implements OnInit {

  projetoId: number
  projeto: Projeto
  step = 0;
  
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['nome', 'descricao', 'tipo_equipamento'];
  dataSource;
  etapaEnvio = Etapa.EMPTY_MODEL;
  equipDisponiveis:EquipamentoProjeto[];
  etapaInstalacao : Etapa
  etapaAtivacao : Etapa

  constructor( private route: ActivatedRoute,
               private router: Router,
               private projetoDataService: ProjetoDataService,
               private location: Location) 
               { }

  ngOnInit() {
      this.route.params.subscribe((params:Params) =>{
        this.projetoId = +params["id"];
        this.fetchProjeto()
    })
  }

  fetchProjeto(){
    this.projetoDataService.getProjeto(this.projetoId).subscribe(projeto => {
      this.projeto = projeto
      console.log("STATUS: " + this.projeto.status)
      this.dataSource = new MatTableDataSource(this.projeto.equipamentos_projeto);
      this.dataSource.sort = this.sort;
    })

    this.projetoDataService.getEtapaEnvio(this.projetoId).subscribe((etapa: Etapa) => {
      this.etapaEnvio = etapa;
    })

    this.projetoDataService.getEquipDisponiveisEnvio(this.projetoId)
        .subscribe((equipamentos: EquipamentoProjeto[]) => {
          this.equipDisponiveis = equipamentos;
    });
    this.projetoDataService.getEtapaInstalacao(this.projetoId).subscribe(etapa => {
      this.etapaInstalacao = etapa
      console.log("Recuperando etapa Instalacao")
      console.log(this.etapaInstalacao.tarefas[0].unidade_responsavel.nome)
      console.log(this.etapaInstalacao.tarefas[0].data_inicio_prevista)      
    })
    
    this.projetoDataService.getEtapaAtivacao(this.projetoId).subscribe(etapa => {
      this.etapaAtivacao = etapa
      console.log("Recuperando etapa Ativacao")
      console.log(this.etapaInstalacao.tarefas[0].unidade_responsavel.nome)
      console.log(this.etapaInstalacao.tarefas[0].data_inicio_prevista)
    })
  }

  setStep(index: number) {
    this.step = index;
  }

  onEdit(id: number) {
    console.log("OnEdit")
    console.log(id)
    this.router.navigate(["/projetos/editar", id], { relativeTo: this.route });
  }

  onCancel() {
    this.location.back()
  }
}
