export class Polo {
    public id:string;
    public nome: string;
    public uf: string;
    public municipio: string;

    constructor(id:string, nome: string, uf: string, municipio: string) {
        this.id = id;
        this.nome = nome;
        this.uf = uf;
        this.municipio = municipio;
    }
}
