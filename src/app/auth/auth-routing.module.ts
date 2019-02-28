import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { LogoutComponent } from './logout/logout.component';

const authRoutes: Routes = [
	{ path: "", 
	  component: AuthComponent,
	  children: [
		  {path: "login", component: LoginComponent},
		  {path: "logout", component: LogoutComponent}
	  ]
	}
];

@NgModule({
	imports:[RouterModule.forChild(authRoutes)],
	exports:[RouterModule]
})
export class AuthRoutingModule{}
