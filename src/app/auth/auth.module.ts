import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, MatIconModule, MatSelectModule, MatTableModule } from '@angular/material';
import { AuthComponent } from './auth.component';
import { LogoutComponent } from './logout/logout.component';
import { SharedModule } from '../_shared/shared.module';
import { MecRoutingModule } from '../mec/mec-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, LogoutComponent, RecuperarSenhaComponent],
	imports: [
		FormsModule,
		AuthRoutingModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatCardModule,
		MatToolbarModule,
		MatIconModule,

		SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatTableModule,
        NgxMaskModule.forRoot()
	]
})
export class AuthModule { }
