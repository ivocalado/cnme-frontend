import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationDataService } from '../../_shared/services/authentication-data.service';
import { Usuario } from '../../_shared/models/usuario.model';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  providers: [AuthenticationDataService]
})
export class MainNavComponent implements OnInit {

  usuarioAutenticado: Usuario
  usuarioPrivilegiado: boolean
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private authenticationDataService: AuthenticationDataService) {}
  
  
  ngOnInit() {
    this.authenticationDataService.getSessionUser().subscribe(usuario => {
      this.usuarioAutenticado = usuario
      this.usuarioPrivilegiado = (this.usuarioAutenticado.unidade.classe != "polo")
    })
  }
}
