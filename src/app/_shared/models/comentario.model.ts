import { Usuario } from './usuario.model';

export class Comentario {
    constructor(
        public id: number, 
        public content: string,
        public comment_type: string,
        public tipo: string,
        public usuario: Usuario

    ){}
    static readonly EMPTY_MODEL = {
        id: null,
        content: '',
        comment_type: '',
        tipo: '',
        usuario: Usuario.EMPTY_MODEL
    }
}