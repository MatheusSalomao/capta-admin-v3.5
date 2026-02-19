import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SegmentationCardComponent } from './segmentation-card/segmentation-card.component';

@Component({
  selector: 'app-registrations-segmentation',
  imports: [SegmentationCardComponent],
  template: `
    <app-segmentation-card
      [title]="title"
      [subtitle]="subtitle"
      [series]="series()"
      [labels]="labels"
      [colors]="colors" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationsSegmentationComponent {
  readonly title = 'Segmentação de matrículas';
  readonly subtitle = 'Detalhamento das situações das matrículas';
  readonly series = input<number[]>([]);
  readonly labels = ['Pendente', 'Pré-matricula', 'Matrículado', 'Cancelado'];
  readonly colors = [
    'var(--chart-series-5)',
    'var(--chart-series-1)',
    'var(--chart-series-3)',
    'var(--chart-series-6)',
  ];
}
