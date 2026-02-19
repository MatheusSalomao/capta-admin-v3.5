export interface MantidaDashboardRankBaseGetResponse {
  id: number;
  nome: string;
  total: number;
}

export interface MantidaDashboardRankGetResponse {
  interesse: Array<MantidaDashboardRankBaseGetResponse>;
  inscricao: Array<MantidaDashboardRankBaseGetResponse>;
  matricula: Array<MantidaDashboardRankBaseGetResponse>;
}
