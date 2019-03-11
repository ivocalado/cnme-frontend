import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UnidadeDataService } from '../../_shared/services/unidade-data.service';
import { SnackBarService } from '../../_shared/helpers/snackbar.service';
import { Unidade } from '../../_shared/models/unidade.model';
import { UsuarioDataService } from '../../_shared/services/usuario-data.service';
import { Usuario } from '../../_shared/models/usuario.model';
import { AuthService } from 'src/app/_shared/services/auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-tvescola-invitation',
  templateUrl: './tvescola-invitation.component.html',
  styleUrls: ['./tvescola-invitation.component.scss']
})
export class TvEscolaInvitationComponent implements OnInit {

  invitationForm: FormGroup;
  unidade: Unidade;
  tiposUsuarios: string[]
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private unidadeDataService: UnidadeDataService,
    private usuarioDataService: UsuarioDataService,
    private snackBarService: SnackBarService,
    private authService: AuthService,
    private location: Location
  ) { }

  ngOnInit() {
      
    this.unidadeDataService.getTvEscola().subscribe(unidade => {
      this.unidade = unidade
      this.usuarioDataService.getTiposUsuarios(this.authService.getToken()).subscribe((tipos: string[]) => {
        this.tiposUsuarios = tipos
        this.initForm();
      })          
    })
  }

  onInvitation() {
    let usuario: Usuario
    usuario = <Usuario>this.invitationForm.value;
    usuario.unidade_id = this.unidade.id
    usuario.nome = usuario.name
    this.usuarioDataService.storeUsuario(usuario, this.authService.getToken()).subscribe(newUser => {
        console.log("newUser: ")
        console.log(newUser)
        this.usuarioDataService.sendInvitation(newUser.id, this.authService.getToken()).subscribe(msg => {
          this.snackBarService.openSnackBar("Convite enviado com sucesso!");
        }, error2 => {
          this.snackBarService.openSnackBar("Falha no envio do convite!");
        })
        this.router.navigate(["/tvescola/detalhes"], { relativeTo: this.route });
    }, error => {
        this.snackBarService.openSnackBar("Erro na criação do usuário.");
        console.log(error)
    })
     
    
    
  }
  
  onCancel() {
    this.location.back()
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
