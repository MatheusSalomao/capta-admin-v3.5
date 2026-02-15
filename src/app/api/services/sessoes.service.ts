import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  buildHttpParams,
  endpoint,
  SessoesCanaisGetParams,
  SessoesPerfilGetResponse,
  SessoesUnidadesGetParams,
} from '@app/api';
import { SessoesCanaisGetResponse } from '@app/api/models/sessoes.canais.get.response';
import { SessoesUnidadesGetResponse } from '@app/api/models/sessoes.unidades.get.response';
import { SessoesTokensPostBody } from '@app/api/models/sessoes.tokens.post.body';
import { SessoesTokensPostResponse } from '@app/api/models/sessoes.tokens.post.response';

@Injectable({
  providedIn: 'root',
})
export class SessoesService {
  constructor(private http: HttpClient) {}

  token(body: SessoesTokensPostBody): Observable<SessoesTokensPostResponse> {
    return this.http.post<SessoesTokensPostResponse>(endpoint('/login', 1), {
      username: body.email,
      password: body.senha,
    });
  }

  perfil(): Observable<SessoesPerfilGetResponse> {
    return this.http.get<SessoesPerfilGetResponse>(endpoint('/sessoes/perfil'));
  }

  canais(params: SessoesCanaisGetParams): Observable<SessoesCanaisGetResponse> {
    return this.http.get<SessoesCanaisGetResponse>(endpoint('/sessoes/canais'), { params: buildHttpParams(params) });
  }

  unidades(params?: SessoesUnidadesGetParams): Observable<SessoesUnidadesGetResponse> {
    return this.http.get<SessoesUnidadesGetResponse>(endpoint('/sessoes/unidades'), {
      params: buildHttpParams(params),
    });
  }
}
