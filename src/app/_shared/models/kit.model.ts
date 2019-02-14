import { Equipamento } from "./equipamento.model";

export class Kit {
    constructor(
        public id: number,
        public nome: string,
        public descricao: string,
        public usuario_id: number,
        public equipamentos: Equipamento[]
    ) { }
    static readonly EMPTY_MODEL = {
        id: null,
        nome: '',
        descricao: '',
        usuario_id: null,
        equipamentos: null
    }
}
