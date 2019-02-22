import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationDataService } from '../services/authentication-data.service';
import { Usuario } from '../models/usuario.model';


@Injectable()
export class Permissions {
	permissions
	usuarioLogado : Usuario


	constructor(private authenticationDataService : AuthenticationDataService) {
		this.authenticationDataService.getSessionUser().subscribe(usuario => {
			this.usuarioLogado =  usuario
		})

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
			return false
		let tipoUnidade = this.usuarioLogado.unidade.classe
		let permissao = (this.permissions[tipoUnidade].includes(url))
		return permissao
	}

	canActivateChild(url: string) {
		if(this.usuarioLogado == null)
			return false
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
    constructor(private router: Router, private authenticationDataService: AuthenticationDataService) {
        this.permissions = new Permissions(this.authenticationDataService)
     }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
	{

		let url: string = state.url
		console.log("URL acessada: " + url)
		return this.permissions.canActivate(url);
	}

	canActivateChild(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
	{

		let url: string = state.url
		console.log("URL acessada: " + url)
		return this.permissions.canActivateChild(url)
	}
}

