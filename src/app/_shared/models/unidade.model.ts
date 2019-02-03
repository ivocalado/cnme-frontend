import { Localidade } from './localidade.model';

export class Unidade {
    constructor(
        public id: string,
        public codigo_inep: string,
        public nome: string,
        public url: string,
        public email: string,
        public diretor: string,
        public telefone: string,
        public tipo_unidade_id: number,
        public localidade:Localidade
    ) { }
}