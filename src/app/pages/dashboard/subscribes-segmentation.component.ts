import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SegmentationCardComponent } from './segmentation-card/segmentation-card.component';

@Component({
  selector: 'app-subscribes-segmentation',
  imports: [SegmentationCardComponent],
  template: `
    <app-segmentation-card
      [title]="title"
      [subtitle]="subtitle"
      [series]="series()"
      [labels]="labels"
      [colors]="colors"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscribesSegmentationComponent {
  readonly title = 'Segmentação de inscrições';
  readonly subtitle = 'Detalhamento das situações das inscrições';
  readonly series = input<number[]>([]);
  readonly labels = ['Pendente', 'Em Avaliação', 'Aprovado', 'Reprovado', 'Desistente', 'Cancelado'];
  readonly colors = [
    'var(--chart-series-1)',
    'var(--chart-series-2)',
    'var(--chart-series-3)',
    'var(--chart-label)',
    'var(--chart-series-5)',
    'var(--chart-series-6)',
    'var(--mat-sys-primary)',
    'var(--mat-sys-primary-fixed-dim)',
    'var(--mat-sys-secondary)',
  ];
}
