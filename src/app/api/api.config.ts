import { InjectionToken } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { environment } from '@/environments/environment';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export function endpoint(path: string, version?: number) {
  let baseUrl = environment.apiBaseUrl;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (version !== undefined) {
    baseUrl = baseUrl.replace(/\/v\d+\b/, `/v${version}`);
  }

  return `${baseUrl}${normalizedPath}`;
}

export function buildHttpParams<T extends object>(params?: T): HttpParams {
  let httpParams = new HttpParams();
  if (!params) return httpParams;
  for (const [key, value] of Object.entries(params as Record<string, unknown>)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      for (const item of value) {
        httpParams = httpParams.append(key, String(item));
      }
    } else {
      httpParams = httpParams.set(key, String(value));
    }
  }
  return httpParams;
}
