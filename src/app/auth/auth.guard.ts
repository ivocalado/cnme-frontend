import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../_shared/models/usuario.model';
import { AuthService } from '../_shared/services/auth.service';


@Injectable()
export class Permissions {
	pagePermissions = {}//Define o conjunto de páginas que cada usuário poderá visualizar
	unidadesPermissions = {}//Define a hierarquia entre as diferentes unidades para controle de modificação

	usuarioLogado : Usuario
	excludedPages = [] //Define as urls que não serão inclusas na validação.


	constructor(private authService : AuthService) {
		this.usuarioLogado  = this.authService.getCurrentUser()

		this.unidadesPermissions = {
			admin: ["mec", "tvescola", "polo", "empresa"],
			mec: ["polo", "empresa"],
			tvescola: ["polo", "empresa"]
		}

		this.pagePermissions = {
			admin: [
				"/projetos", 
				"/polos",
				"/tvescola",
				"/mec",
				"/empresas",
				"/equipamentos",
				"/kits",
				"/tipoEquipamentos",
				"/usuarios",
				"/auth/logout",
				"/dashboard"
			],
			mec: [
				"/projetos", 
				"/polos",
				"/empresas",
				"/equipamentos",
				"/kits",
				"/tipoEquipamentos",
				"/usuarios",
				"/auth/logout",
				"/dashboard"
			],
			tvescola: [
				"/projetos", 
				"/polos",
				"/empresas",
				"/equipamentos",
				"/kits",
				"/tipoEquipamentos",
				"/usuarios",
				"/auth/logout",
				"/dashboard"
			],
			polo: [
				"/projetos", 
				"/polos",
				"/usuarios",
				"/auth/logout"
			],
		}

		this.excludedPages = [
			"/usuarios/confirmar",
			"/usuarios/novasenha/validar",
		]
	}	

	canActivate(url: string) {
		if(this.usuarioLogado == null)
			return true
		let tipoUnidade = this.usuarioLogado.unidade.classe
		let permissao = false
		for (let u of this.pagePermissions[tipoUnidade]) {
			if(url.startsWith(u)) {
				permissao = true
				break
			}
		}
		return permissao
	}

	canActivateChild(url: string) {
		
		if(this.usuarioLogado == null)
			return true
		let tipoUnidade = this.usuarioLogado.unidade.classe
		let permissao = false
		for (let u of this.pagePermissions[tipoUnidade]) {
			if(url.startsWith(u)) {
				permissao = true
				break
			}
		}
		return permissao
	}

	isAnExcludedPage(url: string) {
		let result: boolean = false
		for(let u of this.excludedPages) {
			if(url.includes(u)) {
				result = true
				break
			}
				
		}
		return result
	}
}

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild  {
	permissions: Permissions
    constructor(private router: Router, private authService: AuthService) {
         this.permissions = new Permissions(this.authService)
     }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
	{

		let url: string = state.url
		console.log("canActivate")
		console.log("URL acessada: " + url)
		let isHome = url == "/"
		if(this.permissions.isAnExcludedPage(url) || this.checkLogin(url, next.data.roles)) {
			if(isHome) {
				return true
			} else if (this.permissions.canActivate(url)) {
				return true
			} else {
				this.router.navigate(['/']);
				return false
			}
		} else {
			return false
		}
	}

	canActivateChild(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
	{

		let url: string = state.url
		console.log("canActivateChild")
		console.log("URL acessada: " + url)

		let isHome = url == "/"
		if(this.permissions.isAnExcludedPage(url) || this.checkLogin(url, next.data.roles)) {
			if(isHome) {
				return true
			} else if (this.permissions.canActivateChild(url)) {
				return true
			} else {
				this.router.navigate(['/']);
				return false
			}
		} else {
			return false
		}
	}

	checkLogin(url: string, allowedRoles: string[]): boolean {
		console.log("checking Login");

		//return true;
		if (this.authService.isAuthenticated) {
			console.log("Result: true")
			return true;
		}
		console.log("credirect");

		this.authService.redirectUrl = url;
		this.router.navigate(['/auth/login']);
		console.log("Result: false")
		return false;

	}
}

