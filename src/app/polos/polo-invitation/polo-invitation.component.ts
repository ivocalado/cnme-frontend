import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UnidadeDataService } from '../../_shared/services/unidade-data.service';
import { SnackBarService } from '../../_shared/helpers/snackbar.service';
import { Unidade } from '../../_shared/models/unidade.model';
import { UsuarioDataService } from '../../_shared/services/usuario-data.service';
import { Usuario } from '../../_shared/models/usuario.model';

@Component({
  selector: 'app-polo-invitation',
  templateUrl: './polo-invitation.component.html',
  styleUrls: ['./polo-invitation.component.scss']
})
export class PoloInvitationComponent implements OnInit {

  invitationForm: FormGroup;
  unidade: Unidade;
  tiposUsuarios: string[]
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private unidadeDataService: UnidadeDataService,
    private usuarioDataService: UsuarioDataService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params) =>{
      let unidadeId =  +params["id"]
      
      if(unidadeId != null) {
        this.unidadeDataService.getUnidade(unidadeId).subscribe(unidade => {
          this.unidade = unidade
          this.usuarioDataService.getTiposUsuarios().subscribe((tipos: string[]) => {
            this.tiposUsuarios = tipos
            this.initForm();
          })          
        })
        
      } else {
        this.snackBarService.openSnackBar("Requisição inválida!");
        this.router.navigate(["/polos"], { relativeTo: this.route });
      }
    })
  }

  onInvitation() {
    let usuario: Usuario
    usuario = <Usuario>this.invitationForm.value;
    usuario.unidade_id = this.unidade.id
    console.log("onInvitation")
    console.log(usuario)
    this.usuarioDataService.sendInvitation(this.invitationForm.value).subscribe(usuario => {
      this.snackBarService.openSnackBar("Convite enviado com sucesso!");
      this.router.navigate(["/polos"], { relativeTo: this.route });
      this.router.navigate(["/polos/detalhes", this.unidade.id], { relativeTo: this.route });
    }) 
    
    
  }
  
  onCancel() {
    this.router.navigate(["/polos/detalhes", this.unidade.id], { relativeTo: this.route });
}

  private initForm() {

    this.invitationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      cpf: new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required),
      funcao: new FormControl('', Validators.required),
      telefone: new FormControl()
    });
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
}