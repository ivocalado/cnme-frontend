import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth.guard';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';

const authRoutes: Routes = [
	{ path: "", 
	  component: AuthComponent,
	  children: [
		  {path: "login", component: LoginComponent},
		  {path: "recuperarSenha", component: RecuperarSenhaComponent},
		  {path: "logout", component: LogoutComponent, canActivate: [AuthGuard]}
	  ]
	}
];

@NgModule({
	imports:[RouterModule.forChild(authRoutes)],
	exports:[RouterModule]
})
export class AuthRoutingModule{}
