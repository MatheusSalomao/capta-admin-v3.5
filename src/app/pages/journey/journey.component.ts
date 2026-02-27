import { Component, DestroyRef, inject, LOCALE_ID, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { AsideComponent } from '@app/pages/journey/aside/aside.component';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';
import { JornadasService, MantidaJornadasInscricaoGetResponse } from '@app/api';
import { catchError, finalize, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-journey',
  imports: [MatCard, MatCardContent, AsideComponent, MatTabGroup, MatTab, MatTabLabel, DatePipe, DecimalPipe],
  templateUrl: './journey.component.html',
  styleUrl: './journey.component.scss',
})
export class JourneyComponent {
  private readonly jornadas = inject(JornadasService);
  private readonly destroyRef = inject(DestroyRef);

  readonly selectedRegistration = signal<MantidaJornadasInscricaoGetResponse | null>(null);
  readonly isLoadingRegistration = signal(false);

  onRegistrationSelected(jornadaId: number | null): void {
    if (!jornadaId) {
      this.selectedRegistration.set(null);
      return;
    }

    this.isLoadingRegistration.set(true);
    this.jornadas
      .inscricao(jornadaId)
      .pipe(
        catchError(() => of(null)),
        finalize(() => this.isLoadingRegistration.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(response => {
        this.selectedRegistration.set(response);
      });
  }

  formatMoney(value: number | null | undefined): string {
    if (value === null || value === undefined) {
      return '—';
    }

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value / 100);
  }
}
