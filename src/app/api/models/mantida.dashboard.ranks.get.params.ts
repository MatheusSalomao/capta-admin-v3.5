import { Rank } from '@app/api';

export interface MantidaDashboardRankGetParams {
  rank?: Rank;
  intervalo?: number;
  quantidade?: number;
}
