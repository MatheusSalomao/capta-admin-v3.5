import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { finalize, shareReplay, tap } from 'rxjs/operators';
import { endpoint, EnumType, MantidaJornadasInscricaoGetResponse } from '@app/api';
import { UiOptionsGetResponse } from '@app/api/models/ui.options.get.response';

@Injectable({
  providedIn: 'root',
})
export class EnumService {
  private cache?: UiOptionsGetResponse;
  private inFlight?: Observable<UiOptionsGetResponse>;
  private loadingTriggered = false;

  constructor(private http: HttpClient) {}

  options(): Observable<UiOptionsGetResponse> {
    if (this.cache) {
      return of(this.cache);
    }

    if (this.inFlight) {
      return this.inFlight;
    }

    this.inFlight = this.http.get<UiOptionsGetResponse>(endpoint('/ui/options')).pipe(
      tap(response => {
        this.cache = response;
      }),
      finalize(() => {
        this.inFlight = undefined;
      }),
      shareReplay(1)
    );

    return this.inFlight;
  }

  getLabel(type: EnumType, value: string | null | undefined, fallback = 'Não informado'): string {
    this.ensureLoaded();

    if (!value) {
      return fallback;
    }

    const items = this.cache?.[type];
    const label = items?.find(item => item.value === value)?.label;

    return label ?? value;
  }

  private ensureLoaded(): void {
    if (this.cache || this.loadingTriggered) {
      return;
    }

    this.loadingTriggered = true;
    this.options().subscribe({
      error: () => {
        this.loadingTriggered = false;
      },
      complete: () => {
        if (!this.cache) {
          this.loadingTriggered = false;
        }
      },
    });
  }

  clearCache(): void {
    this.cache = undefined;
  }
}
