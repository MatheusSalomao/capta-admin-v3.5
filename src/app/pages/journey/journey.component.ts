import { Component, DestroyRef, inject, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { AsideComponent } from '@app/pages/journey/aside/aside.component';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { EnumService, JornadasService, MantidaJornadasInscricaoGetResponse } from '@app/api';
import { catchError, finalize, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MoneyPipe } from '@app/pipe/money.pipe';

@Component({
  selector: 'app-journey',
  imports: [
    MatCard,
    MatCardContent,
    AsideComponent,
    MatTabGroup,
    MatTab,
    MatTabLabel,
    DatePipe,
    DecimalPipe,
    MoneyPipe,
  ],
  templateUrl: './journey.component.html',
  styleUrl: './journey.component.scss',
})
export class JourneyComponent {
  readonly selectedRegistration = signal<MantidaJornadasInscricaoGetResponse | null>(null);
  readonly isLoadingRegistration = signal(false);

  readonly enums = inject(EnumService);
  private readonly jornadas = inject(JornadasService);
  private readonly destroyRef = inject(DestroyRef);

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
}
