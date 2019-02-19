import { EquipamentoProjeto } from './equipamentoProjeto.model';

export class Tarefa{
    constructor(
        public id:number,
        public nome:string,
        public numero:string,
        public usuario_id:number,
        public unidade_responsavel_id:number,
        public unidade_responsavel:number,
        public data_inicio_prevista:Date,
        public data_fim_prevista:Date,
        public equipamentos_projeto_ids:number[],
        public equipamentos_projeto:EquipamentoProjeto
    ){}
    static readonly EMPTY_MODEL = {
        id: null,
        nome: '',
        numero: '',
        usuario_id: null,
        unidade_responsavel_id: null,
        unidade_responsavel: null,
        data_inicio_prevista: null,
        data_fim_prevista: null,
        equipamentos_projeto_ids: null,
        equipamentos_projeto: EquipamentoProjeto.EMPTY_MODEL
    }
}

/*"id": 1,
        "nome": "Envio dos equipamentos",
        "numero": "MT34234212",
        "descricao": null,
        "status": "ABERTA",
        "link_externo": null,
        "data_inicio_prevista": "2019-01-31",
        "data_fim_prevista": "2019-02-04",
        "data_inicio": "",
        "data_fim": "",
        "usuario":,
        "etapa_id": 1,
        "responsavel": null,
        "unidade_responsavel": {

        },
        "equipamentos_projeto": [
            {
                "id": 13,
                "detalhes": null,
                "observacao": null,
                "status": "PLANEJADO",
                "projeto": 4,
                "equipamento": {
                    "id": 1,
                    "nome": "TV Beta 100x",
                    "descricao": "Aparelho de televisão 100x",
                    "fornecedor": "Digital 100x Tecnologia",
                    "requisitos": "Mesa de apoio ou suporte para TV 40 / 15kg",
                    "removido": false,
                    "tipo_equipamento": {
                        "id": 1,
                        "nome": "TV",
                        "descricao": "Aparelho de televisão"
                    }
                }
            }
        ]
        */