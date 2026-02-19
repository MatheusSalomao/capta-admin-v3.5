import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { WeeklyMetricCardComponent } from './weekly-metric-card/weekly-metric-card.component';

@Component({
  selector: 'app-weekly-subscribers',
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
export class WeeklySubscribersComponent {
  readonly title = 'Registros de Inscrições';
  readonly seriesName = 'Inscrições';
  readonly seriesColor = 'var(--chart-series-5)';
  readonly variationLabel = 'vs semana anterior';
  readonly series = input<number[]>([]);
}
