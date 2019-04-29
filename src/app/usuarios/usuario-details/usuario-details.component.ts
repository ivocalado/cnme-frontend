import { Component, OnInit } from '@angular/core';
import { UsuarioDataService } from 'src/app/_shared/services/usuario-data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Usuario } from 'src/app/_shared/models/usuario.model';
import { AuthService } from 'src/app/_shared/services/auth.service';
import {Location} from '@angular/common';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';

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
    private location: Location,
    private snackBarService: SnackBarService) { }

  ngOnInit() {
    console.log("usuario-details")
    this.usuario = Usuario.EMPTY_MODEL
    this.route.params.subscribe((params:Params) =>{
      const usuarioId = +params["id"];
      if(this.isAdmin || this.authService.getCurrentUser().id == usuarioId) {
        this.usuarioDataService.getUsuario(usuarioId, this.authService.getToken()).subscribe((usuario:Usuario) =>{
          this.usuario = usuario;
        })
      } else {
        this.snackBarService.openSnackBar("Requisição inválida.");
        this.router.navigate(["/"], { relativeTo: this.route });
        return
      }

      
    })
  }

  get isAdmin() {
    let usuarioAutenticado = this.authService.getCurrentUser();
    let classe = usuarioAutenticado.unidade.classe;
    return classe == "admin" || classe == "tvescola" || classe == "mec";
  }

  onCancel() {
    this.location.back()
  }

  onEdit(id: number) {
    this.router.navigate(["/usuarios/editar", id]);
  }

  get isOwner() {
    return this.usuario.id == this.authService.getCurrentUser().id
  }

}
