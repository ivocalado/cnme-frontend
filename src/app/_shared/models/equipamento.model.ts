import { TipoEquipamento } from './tipoEquipamento.model';

export class Equipamento {
    constructor(
        public id: string,
        public nome: string,
        public descricao: string,
        public fornecedor: string,
        public requisitos: string,
        public tipoEquipamento:TipoEquipamento,
        public tipo_equipamento_id: string
    ) { }
}
