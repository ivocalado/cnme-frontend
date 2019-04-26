import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_shared/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    
  }

  get isUserDataLoaded() {
    let usuarioAutenticado = this.authService.getCurrentUser();
    return usuarioAutenticado != null
  }

  get isAdmin() {
    let usuarioAutenticado = this.authService.getCurrentUser();
    let classe = usuarioAutenticado.unidade.classe;
    return classe == "admin" || classe == "tvescola" || classe == "mec";
  }
}
