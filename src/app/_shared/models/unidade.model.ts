import { Localidade } from './localidade.model';

export class Unidade {
    constructor(
        public id: number,
        public codigo_inep: string,
        public nome: string,
        public url: string,
        public email: string,
        public diretor: string,
        public telefone: string,
        public tipo_unidade_id: number,
        public classe: string,
        public localidade: Localidade
    ) { }
    static readonly EMPTY_MODEL = {
        id: null,
        codigo_inep: '',
        nome: '',
        url: '',
        email: '',
        diretor: '',
        telefone: '',
        tipo_unidade_id: null,
        classe:'',
        localidade: Localidade.EMPTY_MODEL,
    };
}