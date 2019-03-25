import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';
import { UsuarioDataService } from 'src/app/_shared/services/usuario-data.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent implements OnInit {

  recoverForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router, 
    private snackBarService: SnackBarService,
    private usuarioDataService: UsuarioDataService
    ) { }

  ngOnInit() {
    if(this.authService.isAuthenticated){
			this.router.navigate(["/"]);
		} else {
      this.initForm()
    }
  }

  onCancel() {
    this.router.navigate(["/"]);
  }

  onPasswordRecover() {
    console.log("Status: " + this.recoverForm.valid)
    let email: string = this.recoverForm.value.email
    this.usuarioDataService.sendPasswordRecover(email).subscribe(res => {
      this.snackBarService.openSnackBar(res)
      this.router.navigate(["/"]);
    }, err => {
      this.snackBarService.openSnackBar(err)
    })
  }

  initForm() {
    this.recoverForm = new FormGroup({
      email: new FormControl('', [
          Validators.required,
          Validators.email
      ]),
    });
  }
}
