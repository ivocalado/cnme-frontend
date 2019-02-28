import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { AuthComponent } from './auth.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, LogoutComponent],
	imports: [
		FormsModule,
		AuthRoutingModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatCardModule,
		MatToolbarModule,
		MatIconModule
	]
})
export class AuthModule { }
