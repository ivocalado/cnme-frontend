import { Localidade } from './localidade.model';

export class Kit {
    constructor(
        public id: string,
        public codigo_inep: string,
        public nome: string,
        public url: string,
        public email: string,
        public diretor: string,
        public telefone: string,
        public tipo_kit_id: number,
        public localidade:Localidade
    ) { }
}
