import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../../_shared/models/usuario.model';
import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
  loggedIn: any;
  usuarioAutenticado: Usuario
  usuarioPrivilegiado: boolean
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {
    this.loggedIn = this.authService.isAuthenticated;
  }
  
  
  ngOnInit() {
    console.log("Executando ngOnInit MainNacCompnent")
    this.usuarioAutenticado = this.authService.getCurrentUser()
    console.log(this.usuarioAutenticado)
    this.usuarioPrivilegiado = this.usuarioAutenticado && this.usuarioAutenticado.unidade && (this.usuarioAutenticado.unidade.classe != "polo")
  }
}
