interface SessoesUnidadesBaseGetResponse {
  id: number;
  uid: string;
  nome: string;
  kind: string;
}

export interface SessoesUnidadesCampusGetResponse extends SessoesUnidadesBaseGetResponse {
  tipo: string;
  codigo: number;
  kind: 'campus';
}

export interface SessoesUnidadesMantidaGetResponse extends SessoesUnidadesBaseGetResponse {
  sigla: string;
  codigo: number;
  kind: 'mantida';
}

export interface SessoesUnidadesMantenedoraGetResponse extends SessoesUnidadesBaseGetResponse {
  codigo: number;
  instanceof: 'mantenedora';
}

export interface SessoesUnidadesGrupoGetResponse extends SessoesUnidadesBaseGetResponse {
  kind: 'grupo';
}

export type SessoesUnidadesGetResponse =
  | SessoesUnidadesCampusGetResponse
  | SessoesUnidadesMantidaGetResponse
  | SessoesUnidadesMantenedoraGetResponse
  | SessoesUnidadesGrupoGetResponse;
