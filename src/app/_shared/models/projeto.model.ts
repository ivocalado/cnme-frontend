import { Unidade } from './unidade.model';
import { Usuario } from './usuario.model';
import { EquipamentoProjeto } from './equipamentoProjeto.model';
import { Messages } from './messages.model';

export class Projeto{
    constructor(
        public id: number,
        public numero: string,
        public status: string,
        public descricao: string,
        public kit_id: number,
        public equipamentos_projeto: EquipamentoProjeto[],
        public data_inicio_previsto: Date,
        public data_fim_previsto: Date,
        public data_inicio: Date,
        public data_fim:Date,
        public unidade: Unidade,
        public usuario: Usuario,
        public unidade_id: number,
        public usuario_id: number,
        public erros:boolean,
        public infos:boolean,
        public avisos:boolean,
        public messages: Messages
    ){}
    static readonly EMPTY_MODEL = {
        id: null,
        numero: '',
        status: '',
        descricao: '',
        kit_id: null,
        equipamentos_projeto: null,
        data_inicio_previsto: null,
        data_fim_previsto: null,
        data_inicio: null,
        data_fim: null,
        unidade: Unidade.EMPTY_MODEL,
        usuario: Usuario.EMPTY_MODEL,
        unidade_id: null,
        usuario_id: null,
        erros: false,
        infos: false,
        avisos: false,
        messages: null
    }
}