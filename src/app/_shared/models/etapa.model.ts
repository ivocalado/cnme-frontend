import { Usuario } from './usuario.model';
import { Tarefa } from './tarefa.model';

export class Etapa{
    constructor(
        public id: number,
        public descricao: string,
        public status: string,
        public tipo: string,
        public usuario: Usuario,
        public tarefas: Tarefa[]
    ){}
    static readonly EMPTY_MODEL = {
        id: null,
        descricao: '',
        status: '',
        tipo: '',
        usuario: Usuario.EMPTY_MODEL,
        tarefas: null
    }
}