import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { buildHttpParams, endpoint } from '@app/api';
import { LocalStorageService } from '@app/services/local-storage.service';
import { MantidaJornadasGetResponse } from '@app/api/models/mantida.jornadas.get.response';
import { MantidaJornadasGetParams } from '@app/api/models/mantida.jornadas.get.params';
import { MantidaJornadasInscricaoGetResponse } from '@app/api/models/mantida.jornadas.inscricao.get.response';

@Injectable({
  providedIn: 'root',
})
export class JornadasService {
  http = inject(HttpClient);
  storage = inject(LocalStorageService);

  buscar(params?: MantidaJornadasGetParams): Observable<Array<MantidaJornadasGetResponse>> {
    return this.http.get<Array<MantidaJornadasGetResponse>>(
      endpoint(`/mantidas/${this.storage.getUnidade()?.id}/jornadas`),
      {
        params: buildHttpParams(params),
      }
    );
  }

  inscricao(id: number): Observable<MantidaJornadasInscricaoGetResponse> {
    return this.http.get<MantidaJornadasInscricaoGetResponse>(
      endpoint(`/mantidas/${this.storage.getUnidade()?.id}/jornadas/${id}/inscricao`)
    );
  }
}
