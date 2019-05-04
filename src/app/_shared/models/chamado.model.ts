import { Unidade } from './unidade.model';
import { Usuario } from './usuario.model';
import { ChamadoStatus } from './chamadoStatus.model';
import { Projeto } from './projeto.model';
import { ChamadoTipo } from './chamadoTipo.model';

export class Chamado {
    constructor(
        public id: number,
        public status: ChamadoStatus,
        public assunto: string,
        public descricao: string,
        public projeto: Projeto,
        public projeto_id: number,
        // public tarefa_id: number,  no momento não utilizado
        public tipo: ChamadoTipo,
        public unidade_responsavel: Unidade,
        public unidade_responsavel_id: number,

        public usuario_responsavel: Usuario,
        public usuario_responsavel_id: number,

        public usuario: Usuario,
        public usuario_id: number,
        
        public unidade: Unidade,
        public unidade_id: number,
        
        public prioridade: number,
        public privado: boolean,
        public data_inicio: string,
        public data_fim: string,
        public notificado_at: string,
        public created_at: string,
        public updated_at: string

    ){}
    static readonly EMPTY_MODEL = {
        id: null,
        status: ChamadoStatus.EMPTY_MODEL,
        assunto: '',        
        descricao: '',
        projeto: Projeto.EMPTY_MODEL,
        projeto_id: null,
        tipo: ChamadoTipo.EMPTY_MODEL,
        unidade_responsavel: Unidade.EMPTY_MODEL,
        unidade_responsavel_id: null,

        usuario_responsavel: Usuario.EMPTY_MODEL,
        usuario_responsavel_id: null,
        
        usuario: Usuario.EMPTY_MODEL,
        usuario_id: null,
        
        unidade: Unidade.EMPTY_MODEL,
        unidade_id: null,
        
        prioridade: null,
        privado: null,
        data_inicio: '',
        data_fim: '',
        notificado_at: '',
        created_at: '',
        updated_at: ''
    }
}