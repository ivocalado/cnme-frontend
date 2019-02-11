import { Estado } from './estado.model';
import { Municipio } from './municipio.model';

export class Localidade {
    constructor(
        public uf: string,
        public logradouro: string,
        public numero: string,
        public bairro: string,
        public complemento: string,
        public cep: string,
        public estado_id: number,
        public municipio_id: number,
        public estado: Estado,
        public municipio: Municipio
    ) { }
    static readonly EMPTY_MODEL = {
        uf: '',
        logradouro: '',
        numero: '',
        bairro: '',
        complemento: '',
        cep: '',
        estado_id: null,
        municipio_id: null,
        estado: Estado.EMPTY_MODEL,
        municipio: Municipio.EMPTY_MODEL
    }
}
