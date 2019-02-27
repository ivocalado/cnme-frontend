import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePassword = true;
	message:string;

	constructor(public authService:AuthService, public router:Router) {
		this.setMessage();
	}

	ngOnInit() {
		if(this.authService.isAuthenticated()){
			this.router.navigate(["/admin"]);
		}
	}

	setMessage(){
		this.message = 'Logged ' +(this.authService.isAuthenticated()?'in':'out');
	}

	onLogin(form:NgForm){
		this.message = "Trying to log in...";
		this.authService.login(form.value.email, form.value.password)
		.subscribe(()=>{
			this.setMessage();
			if(this.authService.isAuthenticated()){
				let redirect = this.authService.redirectUrl ? this.authService.redirectUrl:'/';
				this.router.navigate([redirect]);
			}
		});
	}

	onLogOut(){
		this.authService.logout();
		this.setMessage();
	}

}
