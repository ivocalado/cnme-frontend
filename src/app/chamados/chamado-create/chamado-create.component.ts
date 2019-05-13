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

  private initForm(){
    this.chamadoForm = new FormGroup({
      projeto_cnme_id: new FormControl('', Validators.required),
      unidade_responsavel_id: new FormControl('', Validators.required),
      us_resp: new FormControl({value: '', disabled: true}),
      usuario_responsavel_id: new FormControl(''),
      prioridade: new FormControl('', Validators.required),       
      tipo_id: new FormControl('', Validators.required),
      assunto: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      
    });
  }

  updateProjeto(res: any) {
    this.projeto_id = res
  }

  showProject() {
    this.router.navigate(["/projetos/detalhes", this.projeto_id], { relativeTo: this.route });
  }
}
