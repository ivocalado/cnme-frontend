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
        public estado_id:number,
        public municipio_id:number,
        public estado:Estado,
        public municipio: Municipio
    ){}
}
