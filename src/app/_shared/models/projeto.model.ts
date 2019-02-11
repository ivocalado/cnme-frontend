import { Unidade } from './unidade.model';
import { Usuario } from './usuario.model';
import { Equipamento } from './equipamento.model';

export class Projeto{
    constructor(
        public id: number,
        public numero: string,
        public status: string,
        public descricao: string,
        public kit_id: number,
        public equipamentos_projeto: Equipamento[],
        public data_criacao: Date,
        public data_implantacao_prevista: Date,
        public data_implantacao_realizada: Date,
        public data_inicio_entrega: Date,
        public created_at:Date,
        public updated_at:Date,
        public unidade: Unidade,
        public usuario: Usuario,
        public unidade_id: number,
        public usuario_id: number
    ){}
    static readonly EMPTY_MODEL = {
        id: null,
        numero: "",
        status: "",
        descricao: "",
        kit_id: null,
        equipamentos_projeto: null,
        data_criacao: null,
        data_implantacao_prevista: null,
        data_implantacao_realizada: null,
        data_inicio_entrega: null,
        created_at: null,
        updated_at: null,
        unidade: Unidade.EMPTY_MODEL,
        usuario: Usuario.EMPTY_MODEL,
        unidade_id: null,
        usuario_id: null
    }
}