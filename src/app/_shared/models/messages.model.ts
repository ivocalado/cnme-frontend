

export class Messages {
    constructor(
        public infos: Object,
        public erros: Object

    ) { }
    static readonly EMPTY_MODEL = {
        infos:null,
        erros:null
    }
}