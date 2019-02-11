export class Usuario{
    constructor(
        public id:number,
        public nome: string,
        public email: string,
        public password: string,
        public cpf: string,
        public unidade_id: number,
        public tipo: string
    ){}
    static readonly EMPTY_MODEL = {
        id: null,
        nome: '',
        email: '',
        password: '',
        cpf: '',
        unidade_id: null,
        tipo: ''
    }
}