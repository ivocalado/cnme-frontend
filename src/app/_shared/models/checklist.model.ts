export class Checklist{
    constructor(
        public id:number,
        public versao:string,
        public descricao:string
    ){}
    static readonly EMPTY_MODEL ={
        id:null,
        versao: '',
        descricao: ''
    }
}