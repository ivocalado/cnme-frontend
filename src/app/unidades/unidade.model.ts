import { Localidade } from '../shared/localidade.model';

export class Unidade {
    constructor(
        public id: string,
        public inep: string,
        public nome: string,
        public url: string,
        public email: string,
        public diretor: string,
        public telefone: string,
        public localidade:Localidade
    ) { }
}