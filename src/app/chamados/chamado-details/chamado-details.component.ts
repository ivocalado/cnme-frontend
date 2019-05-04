import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { ChamadoDataService } from 'src/app/_shared/services/chamado-data.service';
import { Chamado } from 'src/app/_shared/models/chamado.model';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';
import { ChamadoStatus } from 'src/app/_shared/models/chamadoStatus.model';
import { ChamadoTipo } from 'src/app/_shared/models/chamadoTipo.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UnidadeDataService } from 'src/app/_shared/services/unidade-data.service';
import { Unidade } from 'src/app/_shared/models/unidade.model';

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
  unidadesResponsaveis: Unidade[] = []
  chamadoForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private chamadoDataService: ChamadoDataService,
    private snackBarService: SnackBarService,
    private unidadeDataService: UnidadeDataService

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
          this.unidadeDataService.getGestoras().subscribe((res: Unidade[]) => {
            this.unidadesResponsaveis = res
            this.chamadoDataService.getChamado(this.chamadoId).subscribe((res: Chamado) => {
              this.chamado = res
              console.log(res)
              this.initForm(this.chamado);
            })
          })
        })
      });
    })
  }

  private initForm(chamado : Chamado){
    this.chamadoForm = new FormGroup({
        unidade: new FormControl({value: chamado.unidade.nome, disabled: true}),
        unidade_responsavel_id: new FormControl(chamado.unidade_responsavel_id, Validators.required),
        criador: new FormControl({value: chamado.usuario.name, disabled: true}),
        us_resp: new FormControl({value: chamado.usuario_responsavel.name, disabled: true}),
        status_id: new FormControl(chamado.status.id, Validators.required),
        tipo_id: new FormControl(chamado.tipo.id, Validators.required),
        assunto: new FormControl(chamado.assunto, Validators.required),
        descricao: new FormControl(chamado.descricao)        
    });
    console.log("DIRTY: " + this.chamadoForm.dirty)
  }

  unidadeEvent(ev: any) {
    console.log(ev)
  }
}
