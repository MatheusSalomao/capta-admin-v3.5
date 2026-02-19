import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SegmentationCardComponent } from './segmentation-card/segmentation-card.component';

@Component({
  selector: 'app-interests-segmentation',
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
export class InterestsSegmentationComponent {
  readonly title = 'Segmentação de interesses';
  readonly subtitle = 'Detalhamento das qualificações dos interesses';
  readonly series = input<number[]>([]);
  readonly labels = ['Não Qualificado', 'Qualificado Curso', 'Qualificado Preço'];
  readonly colors = ['var(--chart-series-5)', 'var(--chart-series-2)', 'var(--chart-series-3)'];
}
