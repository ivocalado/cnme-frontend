import { Localidade } from './localidade.model';

export class Kit {
    constructor(
        public id: number,
        public codigo_inep: string,
        public nome: string,
        public url: string,
        public email: string,
        public diretor: string,
        public telefone: string,
        public tipo_kit_id: number,
        public localidade:Localidade
    ) { }
    static readonly EMPTY_MODEL = {
        id: null,
        codigo_inep: '',
        nome: '',
        url: '',
        email: '',
        diretor: '',
        telefone: '',
        tipo_kit_id: null,
        localidade: Localidade.EMPTY_MODEL
    }
}
