export class Estado {
    constructor(
        public id: number,
        public nome: string,
        public sigla: string
    ){}
    static readonly EMPTY_MODEL={
        id: null,
        nome: 'string',
        sigla: 'string'
    }
}
