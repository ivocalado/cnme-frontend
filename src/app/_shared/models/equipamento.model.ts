import { TipoEquipamento } from './tipoEquipamento.model';

export class Equipamento {
    constructor(
        public id: string,
        public nome: string,
        public descricao: string,
        public requisito: string,
        public tipoEquipamento:TipoEquipamento
    ) { }
}
