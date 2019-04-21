export class ChamadoTipo {
    constructor(
        public id: number,
        public nome: string,
        public descricao: string,
    ){}
    static readonly EMPTY_MODEL = {
        id: null,
        nome: '',
        descricao: '',
    }
}