import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioDataService } from 'src/app/_shared/services/usuario-data.service';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';
import { Usuario } from 'src/app/_shared/models/usuario.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-usuario-confirm-invitation',
  templateUrl: './usuario-confirm-invitation.component.html',
  styleUrls: ['./usuario-confirm-invitation.component.scss']
})
export class UsuarioConfirmInvitationComponent implements OnInit {

  confirmInvitationForm: FormGroup;
  usuario: Usuario
  hidePassword = true;
  token: string
  constructor(        
    private router:Router,
    private route:ActivatedRoute,
    private usuarioDataService: UsuarioDataService,
    private snackBarService: SnackBarService,
    private location: Location) { }

  ngOnInit() {
    console.log("Iniciou o modulo")
    this.route.queryParams.subscribe((params:Params) =>{
      console.log(params)
      const token = params["token1"];
      console.log(token)
      if(token != null) {
        this.token = token
        this.usuarioDataService.getUsuarioByInvitationToken(this.token).subscribe((usuario: Usuario) => {
          this.usuario = usuario  
          this.initForm()
        }, error => {
          this.snackBarService.openSnackBar(error)
          this.router.navigate(['/'], {relativeTo:this.route})
        })
      } else {
        this.snackBarService.openSnackBar("Requisição inválida.")
        this.router.navigate(['/'], {relativeTo:this.route})
      }
     
    })
  }

  onCancel() {
    this.location.back()
  }

  onConfirm() {
    this.confirmInvitationForm.controls['email'].enable();
    console.log(this.confirmInvitationForm.value)
    this.usuarioDataService.confirmInvitationToken(this.token, this.confirmInvitationForm.value).subscribe((usuario: Usuario) => {
      this.snackBarService.openSnackBar("Conta ativada e cadastro atualizado.")
      this.router.navigate(['/'], {relativeTo:this.route})
    }, error => {
      this.confirmInvitationForm.controls['email'].disable()
      this.snackBarService.openSnackBar(error)
    })
    
  }

  private initForm() {

    this.confirmInvitationForm = new FormGroup({
      name: new FormControl(this.usuario.name, Validators.required),
      email: new FormControl({value: this.usuario.email, disabled: true}),
      cpf: new FormControl(this.usuario.cpf, Validators.required),
      funcao: new FormControl(this.usuario.funcao),
      password: new FormControl(this.usuario.password, Validators.required),
      telefone: new FormControl(this.usuario.telefone)
    });
  }

  showPassword() {
    this.hidePassword = !this.hidePassword
  }
}
