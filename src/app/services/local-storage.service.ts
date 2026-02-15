import { Injectable } from '@angular/core';
import { SessoesUnidadesGetResponse } from '@app/api/models/sessoes.unidades.get.response';

type UnidadeSessao = SessoesUnidadesGetResponse[number];

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly tokenKey = 'sessao_token';
  private readonly unidadeKey = 'sessao_unidade';

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }

  getUnidade(): UnidadeSessao | null {
    const raw = localStorage.getItem(this.unidadeKey);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as UnidadeSessao;
    } catch {
      return null;
    }
  }

  setUnidade(unidade: UnidadeSessao) {
    localStorage.setItem(this.unidadeKey, JSON.stringify(unidade));
  }

  clearUnidade() {
    localStorage.removeItem(this.unidadeKey);
  }

  clearSessao() {
    this.clearToken();
    this.clearUnidade();
  }
}
