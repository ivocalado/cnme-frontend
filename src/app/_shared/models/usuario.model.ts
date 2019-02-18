import { Unidade } from "./unidade.model";

export class Usuario{
    constructor(
        public id:number,
        public nome: string,
        public email: string,
        public ativo: boolean,
        public telefone: string,
        public cpf: string,
        public funcao: string,
        public unidade_id: number,
        public tipo: string,
        public unidade: Unidade,
        public password: string
    ){}
    static readonly EMPTY_MODEL = {
        id: null,
        nome: '',
        email: '',
        ativo: null,
        telefone: '',
        cpf: '',
        funcao: '',
        unidade_id: null,
        tipo: '',
        unidade: Unidade.EMPTY_MODEL,
        password: ''
    }
}