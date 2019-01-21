export class Localidade {
    constructor(
        public uf: string,
        public municipio: string,
        public logadouro: string,
        public numero: string,
        public bairro: string,
        public complemento: string,
        public cep: string
    ){}
}
