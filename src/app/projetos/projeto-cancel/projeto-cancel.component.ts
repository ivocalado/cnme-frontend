import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProjetoDataService } from 'src/app/_shared/services/projeto-data.service';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';
import { Projeto } from 'src/app/_shared/models/projeto.model';
import { FormGroup, FormControl } from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-projeto-cancel',
  templateUrl: './projeto-cancel.component.html',
  styleUrls: ['./projeto-cancel.component.scss']
})
export class ProjetoCancelComponent implements OnInit {

  projeto: Projeto
  projetoForm: FormGroup;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private projetoDataService:ProjetoDataService,
    private snackBarService:SnackBarService,
    private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
        let projetoId: number = +params["id"]    
        if(projetoId == null) {
            this.snackBarService.openSnackBar("Requisição inválida!")
            this.router.navigate(["/"], { relativeTo: this.route });
            return
        } else {
            this.projetoDataService.getProjeto(projetoId).subscribe((projeto: Projeto) => {
                this.projeto = projeto
                this.initForm()
            }, error => {
                this.snackBarService.openSnackBar("Requisição inválida!")
                this.router.navigate(["/"], { relativeTo: this.route });
                return
            })
        }
    })
  }

  initForm(){
    this.projetoForm = new FormGroup({
        descricao: new FormControl('')
    })
  }

  onCancel() {
    this.location.back()
  }

  onCancelProject() {
    if(confirm("O cancelamento de um projeto é uma ação irreversível. Tem certeza que deseja continuar?")) {
      this.projetoDataService.cancelProject(this.projeto.id, this.projetoForm.value.descricao).subscribe(msg => {
        this.snackBarService.openSnackBar("Projeto cancelado com sucesso!")
        this.router.navigate(["/projetos"], { relativeTo: this.route });
      }, 
      error => {
          this.snackBarService.openSnackBar("Ocorreu um erro ao processar a requisição. Tente novamente mais tarde.")
          this.router.navigate(["/"], { relativeTo: this.route });
      }
      )
    }
  }

}
