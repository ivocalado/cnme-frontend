export class Localidade {
    constructor(
        public uf: string,
        public municipio: string,
        public logradouro: string,
        public numero: string,
        public bairro: string,
        public complemento: string,
        public cep: string,
        public estado_id:number,
        public municipio_id:number
    ){}
}
