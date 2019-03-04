import { Component, OnInit } from '@angular/core';
import { UsuarioDataService } from 'src/app/_shared/services/usuario-data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Usuario } from 'src/app/_shared/models/usuario.model';
import { AuthService } from 'src/app/_shared/services/auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-usuario-details',
  templateUrl: './usuario-details.component.html',
  styleUrls: ['./usuario-details.component.scss']
})
export class UsuarioDetailsComponent implements OnInit {

  usuario: Usuario
  constructor(private usuarioDataService: UsuarioDataService, 
    private authService: AuthService, 
    private route:ActivatedRoute,
    private router:Router,
    private location: Location) { }

  ngOnInit() {
    this.usuario = Usuario.EMPTY_MODEL
    this.route.params.subscribe((params:Params) =>{
      const usuarioId = +params["id"];
      this.usuarioDataService.getUsuario(usuarioId, this.authService.getToken()).subscribe((usuario:Usuario) =>{
          this.usuario = usuario;
      })
    })
  }

  onCancel() {
    this.location.back()
  }

}
