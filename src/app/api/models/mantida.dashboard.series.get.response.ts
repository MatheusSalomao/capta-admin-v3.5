export interface MantidaDashboardSeriesGetResponse {
  semana: Array<number>;
  interesses: Array<number>;
  inscricoes: Array<number>;
  matriculas: Array<number>;
  interesse_vs_inscricao: Array<number>;
  inscricao_vs_matricula: Array<number>;
  tempo_medio: Array<number>;
}
