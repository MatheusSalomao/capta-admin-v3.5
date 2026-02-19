import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { WeeklyMetricCardComponent } from './weekly-metric-card/weekly-metric-card.component';

@Component({
  selector: 'app-weekly-interests-chart',
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
export class WeeklyInterestsComponent {
  readonly title = 'Registros de Interesses';
  readonly seriesName = 'Interesses';
  readonly seriesColor = 'var(--chart-series-1)';
  readonly variationLabel = 'vs semana anterior';
  readonly series = input<number[]>([]);
}
