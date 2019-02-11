import { TipoEquipamento } from './tipoEquipamento.model';

export class Equipamento {
    constructor(
        public id: number,
        public nome: string,
        public descricao: string,
        public fornecedor: string,
        public requisitos: string,
        public tipoEquipamento:TipoEquipamento,
        public tipo_equipamento_id: number
    ) { }
    static readonly EMPTY_MODEL = {
        id: null,
        nome: '',
        descricao: '',
        fornecedor: '',
        requisitos: '',
        tipoEquipamento: TipoEquipamento.EMPTY_MODEL,
        tipo_equipamento_id: null
    }
}
