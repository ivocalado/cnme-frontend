import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  	hidePassword = true;
	message:string;

	constructor(public authService:AuthService, public router:Router, private snackBarService: SnackBarService) {
	}

	ngOnInit() {
		if(this.authService.isAuthenticated){
			this.router.navigate(["/"]);
		}
	}

	setMessage(){
		this.message = 'Usuário ' +(this.authService.isAuthenticated?'logado':'deslogado');
	}

	onLogin(form:NgForm){
		this.authService.login(form.value.email, form.value.password)
		.subscribe(res =>{
			console.log(res)
			this.setMessage();
			if(this.authService.isAuthenticated){
				this.snackBarService.openSnackBar("Usuário logado com sucesso!")
				let redirect = this.authService.redirectUrl ? this.authService.redirectUrl:'/';
				this.router.navigate(["/"]);
			}
		}, 
		error => {
			this.snackBarService.openSnackBar(error)
			this.message = error
			console.log(error)
		});
	}
}
