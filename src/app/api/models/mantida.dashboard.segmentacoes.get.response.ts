export interface MantidaDashboardSegmentacoesGetResponse {
  interesse: {
    qualificacao_fraca: number;
    qualificacao_curso: number;
    qualificacao_preco: number;
  };
  inscricao: {
    pendente: number;
    em_avaliacao: number;
    aprovado: number;
    reprovado: number;
    desistente: number;
    cancelado: number;
  };
  matricula: {
    pendente: number;
    pre_matricula: number;
    matricula: number;
    cancelado: number;
  };
}
