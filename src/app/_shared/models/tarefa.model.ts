import { EquipamentoProjeto } from './equipamentoProjeto.model';
import { Unidade } from './unidade.model';

export class Tarefa{
    constructor(
        public id:number,
        public nome:string,
        public numero:string,
        public usuario_id:number,
        public unidade_responsavel_id:number,
        public unidade_responsavel:Unidade,
        public data_inicio_prevista:Date,
        public data_fim_prevista:Date,
        public data_fim: Date,
        public equipamentos_projeto_ids:number[],
        public equipamentos_projeto:EquipamentoProjeto,
        public etapa_id:number
    ){}
    static readonly EMPTY_MODEL = {
        id: null,
        nome: '',
        numero: '',
        usuario_id: null,
        unidade_responsavel_id: null,
        unidade_responsavel: Unidade.EMPTY_MODEL,
        data_inicio_prevista: null,
        data_fim_prevista: null,
        data_fim:null,
        equipamentos_projeto_ids: null,
        equipamentos_projeto: EquipamentoProjeto.EMPTY_MODEL,
        etapa_id: null
    }
}
