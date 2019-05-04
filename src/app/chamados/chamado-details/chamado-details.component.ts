import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { ChamadoDataService } from 'src/app/_shared/services/chamado-data.service';
import { Chamado } from 'src/app/_shared/models/chamado.model';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';
import { ChamadoStatus } from 'src/app/_shared/models/chamadoStatus.model';
import { ChamadoTipo } from 'src/app/_shared/models/chamadoTipo.model';

@Component({
  selector: 'app-chamado-details',
  templateUrl: './chamado-details.component.html',
  styleUrls: ['./chamado-details.component.scss']
})
export class ChamadoDetailsComponent implements OnInit {

  chamado: Chamado
  chamadoId: number
  status: ChamadoStatus[]
  tipos: ChamadoTipo[]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private chamadoDataService: ChamadoDataService,
    private snackBarService: SnackBarService

  ) { }
  

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.chamadoId = +params["id"];
      if(this.chamadoId == null) {
         this.snackBarService.openSnackBar("Requisição inválida")
         this.router.navigate(["/"], { relativeTo: this.route });
         return
      }
      this.chamadoDataService.getStatus().subscribe((res: ChamadoStatus[]) => {
        this.status = res
        this.chamadoDataService.getTipos().subscribe((res: ChamadoTipo[]) => {
          this.tipos = res
          this.chamadoDataService.getChamado(this.chamadoId).subscribe((res: Chamado) => {
            this.chamado = res
          })
    
        })
      });
    })
  }
}
