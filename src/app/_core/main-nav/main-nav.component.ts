import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../../_shared/models/usuario.model';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Unidade } from 'src/app/_shared/models/unidade.model';

@Component({
    selector: 'app-main-nav',
    templateUrl: './main-nav.component.html',
    styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
    loggedIn: any;
    usuarioAutenticado: Usuario
    usuarioPrivilegiado: boolean
    emailUser: string;
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );

    constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private route: ActivatedRoute,
        private router: Router) {
        this.loggedIn = this.authService.isAuthenticated;
    }


    ngOnInit() {
    }

    get isUsuarioPrivilegiado() {
        let usuarioAutenticado = this.authService.getCurrentUser()
        return (usuarioAutenticado !== null) && usuarioAutenticado.unidade && (usuarioAutenticado.unidade.classe != "polo")
    }

    get isUsuarioAutenticado() {
        let user = this.authService.getCurrentUser();
        if(user)
            this.emailUser = user.email;
        return user;

    }

    get homepage() {
        let usuario = this.authService.getCurrentUser()
        let classes = usuario.unidade.class
        if (usuario) {
            return "/usuarios/detalhes/" + usuario.id
        } else {
            return ""
        }
    }

    get unidade() {
        let usuario = <Usuario>this.authService.getCurrentUser()
        let classe = usuario.unidade.classe
        let unidade_basica = (classe == "polo" || classe == "empresa")
        classe += unidade_basica?"s":""
        if (usuario) {
            if(unidade_basica)
                return "/"+classe+"/detalhes/" + usuario.unidade.id
            else
                return "/"+classe+"/detalhes"
        } else {
            return ""
        }
    }
}
