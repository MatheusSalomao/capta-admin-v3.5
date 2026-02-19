import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { WeeklyMetricCardComponent } from './weekly-metric-card/weekly-metric-card.component';

@Component({
  selector: 'app-weekly-registrations',
  template: `
    <app-weekly-metric-card
      [title]="title"
      [series]="series()"
      [seriesName]="seriesName"
      [seriesColor]="seriesColor"
      [variationLabel]="variationLabel"></app-weekly-metric-card>
  `,
  imports: [WeeklyMetricCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeeklyRegistrationsComponent {
  readonly title = 'Registro de Matrículas';
  readonly seriesName = 'Matrículas';
  readonly seriesColor = 'var(--chart-series-2)';
  readonly variationLabel = 'vs semana anterior';
  readonly series = input<number[]>([]);
}
