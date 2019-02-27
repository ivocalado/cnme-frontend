import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';

const authRoutes: Routes = [
	{ path: "", 
	  component: AuthComponent,
	  children: [
		  {path: "", component: LoginComponent}
	  ]
	}
];

@NgModule({
	imports:[RouterModule.forChild(authRoutes)],
	exports:[RouterModule]
})
export class AuthRoutingModule{}
