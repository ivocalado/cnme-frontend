export class Municipio {
    constructor(
        public id: number,
        public nome: string,
        public estado_id: number
    ) { }
    static readonly EMPTY_MODEL ={
        id: null,
        nome: 'string',
        estado_id: null
    }
}