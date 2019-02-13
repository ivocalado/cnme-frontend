import { Equipamento } from "./equipamento.model";

export class Kit {
    constructor(
        public id: number,
        public nome: string,
        public descricao: string,
        public versao: string,
        public status: string,
        public usuario_id: number,
        public data_inicio: string,
        public data_fim: string,
        public equipamentos: Equipamento[]
    ) { }
    static readonly EMPTY_MODEL = {
        id: null,
        nome: '',
        descricao: '',
        versao: '',
        status: '',
        usuario_id: null,
        data_inicio: '',
        data_fim: '',
        equipamentos: null
    }
}
