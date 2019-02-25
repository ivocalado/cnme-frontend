import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProjetoDataService } from '../../_shared/services/projeto-data.service';
import { Projeto } from '../../_shared/models/projeto.model';
import { MatSort, MatTableDataSource } from '@angular/material';

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
  constructor( private route: ActivatedRoute,
               private router: Router,
               private projetoDataService: ProjetoDataService) 
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
      this.dataSource = new MatTableDataSource(this.projeto.equipamentos_projeto);
      this.dataSource.sort = this.sort;
    })
  }

  setStep(index: number) {
    this.step = index;
  }
}
