import { Equipamento } from './equipamento.model';

export class EquipamentoProjeto{
    constructor(
        public id: number,
        public detalhes: string,
        public observacao: string,
        public status: string,
        public projeto: number,
        public equipamento:Equipamento
    ){}
    static readonly EMPTY_MODEL = {
        id: null,
        detalhes: '',
        observacao: '',
        status: '',
        projeto: null,
        equipamento: Equipamento.EMPTY_MODEL
    }
}