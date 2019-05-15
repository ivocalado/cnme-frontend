import { Component, OnInit } from '@angular/core';
import { ChamadoTipo } from 'src/app/_shared/models/chamadoTipo.model';
import { Unidade } from 'src/app/_shared/models/unidade.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { ChamadoDataService } from 'src/app/_shared/services/chamado-data.service';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';
import { UnidadeDataService } from 'src/app/_shared/services/unidade-data.service';
import { Projeto } from 'src/app/_shared/models/projeto.model';
import { Usuario } from 'src/app/_shared/models/usuario.model';
import { ProjetoDataService } from 'src/app/_shared/services/projeto-data.service';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.scss']
})
export class ChamadoCreateComponent implements OnInit {

  tipos: ChamadoTipo[]
  unidadesResponsaveis: Unidade[]
  usuariosResponsaveis: Unidade[]
  projetos: Projeto[]

  chamadoForm: FormGroup;
  criadorChamado: Usuario
  unidadeDemandante: Unidade
  projeto_id: number

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
    private unidadeDataService: UnidadeDataService,
    private projetoDataService: ProjetoDataService
  ) { }


  ngOnInit() {
    this.criadorChamado = this.authService.getCurrentUser()
    this.unidadeDemandante = this.criadorChamado.unidade

    
    this.projetoDataService.getProjetos(-1, 1).subscribe(res => {
      this.projetos = res.projetos
    })

    
    this.chamadoDataService.getTipos().subscribe((res: ChamadoTipo[]) => {
      this.tipos = res
    })

    this.unidadeDataService.getGestoras().subscribe((res: Unidade[]) => {
      this.unidadesResponsaveis = res
      if(this.unidadeDemandante.classe != "polo") {
        this.unidadeDataService.getAdmin().subscribe((admin: Unidade) => {
          this.unidadesResponsaveis.push(admin)
        })
      }
    })

    

    this.initForm()
    
  }

  updateProjeto(res: any) {
    this.projeto_id = res
  }

  showProject() {
    this.router.navigate(["/projetos/detalhes", this.projeto_id], { relativeTo: this.route });
  }

  get isReady() {
    return true
  }

  onNewChamado() {
     console.log("onNewChamado")
     console.log(this.getDirtyValues(this.chamadoForm))
     let chamadoToSend : any = this.getDirtyValues(this.chamadoForm)
     chamadoToSend['usuario_id'] = this.criadorChamado.id
     chamadoToSend['unidade_id'] = this.unidadeDemandante.id
     this.chamadoDataService.storeChamado(chamadoToSend).subscribe(chamado => {
        this.router.navigate(["/chamados/detalhes", chamado.id], { relativeTo: this.route });
        this.snackBarService.openSnackBar("Chamado salvo com sucesso!")
     })
  }
  
  private initForm(){
    this.chamadoForm = new FormGroup({
      projeto_cnme_id: new FormControl(''),
      unidade_responsavel_id: new FormControl('', Validators.required),
      us_resp: new FormControl({value: '', disabled: true}),
      usuario_responsavel_id: new FormControl(''),
      prioridade: new FormControl('', Validators.required),       
      tipo_id: new FormControl('', Validators.required),
      assunto: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      
    });
  }

  private getDirtyValues(form: any) {
    let dirtyValues = {};

    Object.keys(form.controls)
        .forEach(key => {
            let currentControl = form.controls[key];

            if (currentControl.dirty && currentControl.value !== undefined) {
                if (currentControl.controls)
                    dirtyValues[key] = this.getDirtyValues(currentControl);
                else
                    dirtyValues[key] = currentControl.value;
            }
        });

    return dirtyValues;
  }

  
  unidadeEvent(unidade_id: number) {

    this.unidadeDataService.getUnidade(unidade_id).subscribe((unidade: Unidade) => {
        if(this.canDefineUsuario) {
          this.unidadeDataService.getUsuariosAtivosByUnidade(unidade_id, -1, 1).subscribe(res => {
            this.usuariosResponsaveis = res.usuarios
            this.chamadoForm.patchValue({usuario_responsavel_id: unidade.usuarioChamados.id})  
          })
        } else {
          this.chamadoForm.patchValue({us_resp: unidade.usuarioChamados.name})
        }
        
    })
  }

  get canDefineUsuario() {
    let usuarioLogado = this.authService.getCurrentUser()
    return usuarioLogado.unidade.classe == "admin" || usuarioLogado.unidade.id == this.getDirtyValues(this.chamadoForm)['unidade_responsavel_id']
  }
}
