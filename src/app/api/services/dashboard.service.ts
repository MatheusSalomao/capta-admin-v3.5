import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { buildHttpParams, endpoint, MantidaDashboardSeriesGetResponse } from '@app/api';
import { LocalStorageService } from '@app/services/local-storage.service';
import { MantidaDashboardRankGetResponse } from '@app/api/models/mantida.dashboard.ranks.get.response';
import { MantidaDashboardRankGetParams } from '@app/api/models/mantida.dashboard.ranks.get.params';
import { MantidaDashboardSegmentacoesGetResponse } from '@app/api/models/mantida.dashboard.segmentacoes.get.response';
import { MantidaDashboardEventosGetResponse } from '@app/api/models/mantida.dashboard.eventos.get.response';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  http = inject(HttpClient);
  storage = inject(LocalStorageService);

  series(): Observable<MantidaDashboardSeriesGetResponse> {
    return this.http.get<MantidaDashboardSeriesGetResponse>(
      endpoint(`/mantidas/${this.storage.getUnidade()?.id}/dashboard/series`)
    );
  }

  ranks(params?: MantidaDashboardRankGetParams): Observable<MantidaDashboardRankGetResponse> {
    return this.http.get<MantidaDashboardRankGetResponse>(
      endpoint(`/mantidas/${this.storage.getUnidade()?.id}/dashboard/ranks`),
      { params: buildHttpParams(params) }
    );
  }

  segmentacoes(): Observable<MantidaDashboardSegmentacoesGetResponse> {
    return this.http.get<MantidaDashboardSegmentacoesGetResponse>(
      endpoint(`/mantidas/${this.storage.getUnidade()?.id}/dashboard/segmentacoes`)
    );
  }

  eventos(): Observable<Array<MantidaDashboardEventosGetResponse>> {
    return this.http.get<Array<MantidaDashboardEventosGetResponse>>(
      endpoint(`/mantidas/${this.storage.getUnidade()?.id}/dashboard/eventos`)
    );
  }
}
