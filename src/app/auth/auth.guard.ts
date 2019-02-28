import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../_shared/models/usuario.model';
import { AuthService } from '../_shared/services/auth.service';


@Injectable()
export class Permissions {
	permissions
	usuarioLogado : Usuario


	constructor(private authService : AuthService) {
		this.usuarioLogado  = this.authService.getCurrentUser()

		this.permissions = {
			admin: [
				"/projetos", 
				"/unidades",
				"/polos",
				"/empresas",
				"/equipamentos",
				"/kits",
				"/tipoEquipamentos",
				"/usuarios"
			],
			mec: [
				"/projetos", 
				"/unidades",
				"/polos",
				"/empresas",
				"/equipamentos",
				"/kits",
				"/tipoEquipamentos",
				"/usuarios"
			],
			tvescola: [
				"/projetos", 
				"/unidades",
				"/polos",
				"/empresas",
				"/equipamentos",
				"/kits",
				"/tipoEquipamentos",
				"/usuarios"
			],
			polo: [
				"/projetos", 
				"/polos",
				"/usuarios"
			],
		}
	}	

	canActivate(url: string) {
		if(this.usuarioLogado == null)
			return true
		let tipoUnidade = this.usuarioLogado.unidade.classe
		let permissao = (this.permissions[tipoUnidade].includes(url))
		return permissao
	}

	canActivateChild(url: string) {
		if(this.usuarioLogado == null)
			return true
		let tipoUnidade = this.usuarioLogado.unidade.classe
		let permissao = false
		for (let u of this.permissions[tipoUnidade]) {
			if(url.startsWith(u)) {
				permissao = true
				break
			}
		}
		return permissao
	}
}

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild  {
	permissions: Permissions
    constructor(private router: Router, private authService: AuthService) {
        // this.permissions = new Permissions(this.authenticationDataService)
     }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
	{

		let url: string = state.url
		console.log("URL acessada: " + url)
		return this.checkLogin(url, next.data.roles)// && this.permissions.canActivate(url);
	}

	canActivateChild(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
	{

		let url: string = state.url
		console.log("URL acessada: " + url)
		return this.checkLogin(url, next.data.roles)// && this.permissions.canActivateChild(url)
	}

	checkLogin(url: string, allowedRoles: string[]): boolean {
		console.log("checking Login");

		//return true;
		if (this.authService.isAuthenticated()) {
			console.log(this.authService.getCurrentUser().roles);
			return true;
		}
		console.log("credirect");

		this.authService.redirectUrl = url;
		this.router.navigate(['/auth/login']);
		return false;

	}
}
