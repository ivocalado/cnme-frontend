import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioDataService } from 'src/app/_shared/services/usuario-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/_shared/models/usuario.model';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';

@Component({
  selector: 'app-usuario-nova-senha',
  templateUrl: './usuario-nova-senha.component.html',
  styleUrls: ['./usuario-nova-senha.component.scss']
})
export class UsuarioNovaSenhaComponent implements OnInit {

  email: string
  token: string
  passwordValidateForm: FormGroup;
  usuario: Usuario
  hidePassword = true;
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private usuarioDataService: UsuarioDataService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params) =>{
      this.email = params["email"]
      this.token = params["token"]
      if(this.token != null && this.email != null) {
          this.usuarioDataService.validatePassword(this.email, this.token).subscribe(usuario => {
            this.usuario = usuario
            this.initForm()
          }, 
          error => {
            this.snackBarService.openSnackBar(error)
            this.router.navigate(['/'], {relativeTo:this.route})
          })
      } else {
        this.snackBarService.openSnackBar("Requisição inválida.")
        this.router.navigate(['/'], {relativeTo:this.route})
      }
    })
  }

  private initForm() {

    this.passwordValidateForm = new FormGroup({
      name: new FormControl({value: this.usuario.name, disabled: true}),
      email: new FormControl({value: this.usuario.email, disabled: true}),
      password: new FormControl(this.usuario.password, Validators.required),
    });
  }

  onValidate() {
    this.usuarioDataService.updateUserPasswordAfterRecover(this.usuario.id, this.passwordValidateForm.value.password).subscribe(
      res => {
        this.snackBarService.openSnackBar("Senha atualizada com sucesso!")
        this.router.navigate(['/'], {relativeTo:this.route})
      }, 
      error => {
        this.snackBarService.openSnackBar(error)
        this.router.navigate(['/'], {relativeTo:this.route})
      }
    )
  }

  onCancel() {
    this.router.navigate(['/'], {relativeTo:this.route})
  }
}
