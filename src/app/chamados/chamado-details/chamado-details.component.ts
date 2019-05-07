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
import { Comentario } from 'src/app/_shared/models/comentario.model';

@Component({
  selector: 'app-chamado-details',
  templateUrl: './chamado-details.component.html',
  styleUrls: ['./chamado-details.component.scss']
})
export class ChamadoDetailsComponent implements OnInit {


  chamado: Chamado
  comentarios: Comentario[] = []
  chamadoId: number
  status: ChamadoStatus[]
  tipos: ChamadoTipo[]
  unidadesResponsaveis: Unidade[]
  chamadoForm: FormGroup;
  comentarioForm: FormGroup;
  prioridades: any = [
    {id: 1, text: "Baixa"},
    {id: 2, text: "Normal"},
    {id: 3, text: "Alta"},
    {id: 4, text: "Urgente"},
    {id: 5, text: "Imediata"}
  ]

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
      });
      this.chamadoDataService.getTipos().subscribe((res: ChamadoTipo[]) => {
        this.tipos = res
      })
      this.unidadeDataService.getGestoras().subscribe((res: Unidade[]) => {
        this.unidadesResponsaveis = res
      })
      this.fetchChamado()      
    })
  }

  fetchChamado() {
    this.chamadoDataService.getChamado(this.chamadoId).subscribe((res: Chamado) => {
      this.chamado = res
      console.log(res)
      this.initForm(this.chamado);
      this.chamadoDataService.getComentarios(this.chamadoId).subscribe((cmts: Comentario[]) => {
        this.comentarios = cmts
      })
    })
  }

  private initForm(chamado : Chamado){
    this.chamadoForm = new FormGroup({
        unidade: new FormControl({value: chamado.unidade.nome, disabled: true}),
        unidade_responsavel_id: new FormControl(chamado.unidade_responsavel_id, Validators.required),
        criador: new FormControl({value: chamado.usuario.name, disabled: true}),
        us_resp: new FormControl({value: chamado.usuario_responsavel.name, disabled: true}),
        projeto_cnme: new FormControl({value: chamado.projeto.numero + " - " + chamado.projeto.descricao, disabled: true}),
        status_id: new FormControl(chamado.status.id, Validators.required),
        tipo_id: new FormControl(chamado.tipo.id, Validators.required),
        assunto: new FormControl(chamado.assunto, Validators.required),
        descricao: new FormControl(chamado.descricao),
        prioridade: new FormControl(chamado.prioridade, Validators.required),       
    });

    this.comentarioForm = new FormGroup({
      content: new FormControl('', Validators.required)
    })
  }

  checkEvent: boolean = true
  unidadeEvent(ev: any) {
    if(this.checkEvent) {
      this.checkEvent = false
      return
    }

    this.unidadeDataService.getUnidade(ev.source.value).subscribe((unidade: Unidade) => {
        this.chamadoForm.patchValue({us_resp: unidade.usuarioChamados.name})
    })
  }

  getTipoComentario(comentario : Comentario) {
    let tipos : any  = {
      comment: "Comentário",
      auto: "Atualização do chamado"
    }
    return tipos[comentario.tipo]
  }

  onUpdateChamado() {
    let objectToUpdate = this.getDirtyValues(this.chamadoForm)
    this.chamadoDataService.updateChamado(this.chamado.id, objectToUpdate).subscribe(res => {
      this.snackBarService.openSnackBar("Chamado atualizado com sucesso!")
      this.fetchChamado()
    })
  }

  onNewComentario() {
    let comentario: Comentario = this.comentarioForm.value
    this.chamadoDataService.addComentario(this.chamadoId, comentario).subscribe(res => {
      this.snackBarService.openSnackBar("Chamado atualizado com sucesso!")
      this.fetchChamado()
    })
  }

  private getDirtyValues(form: any) {
    let dirtyValues = {};

    Object.keys(form.controls)
        .forEach(key => {
            let currentControl = form.controls[key];

            if (currentControl.dirty) {
                if (currentControl.controls)
                    dirtyValues[key] = this.getDirtyValues(currentControl);
                else
                    dirtyValues[key] = currentControl.value;
            }
        });

    return dirtyValues;
  }

  showProject(id: number) {
    this.router.navigate(["/projetos/detalhes", id], { relativeTo: this.route });
  }
}
