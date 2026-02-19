import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {MatCard, MatCardContent, MatCardSubtitle, MatCardTitle} from '@angular/material/card';

export interface RankItem {
  key: string;
  label: string;
  value: number;
  sublabel?: string;
}

interface RankDisplayItem extends RankItem {
  percent: number;
}

@Component({
  selector: 'app-rank-card',
  templateUrl: './rank-card.component.html',
  imports: [MatCard, MatCardContent, MatCardSubtitle, MatCardTitle, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RankCardComponent {
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
  readonly items = input<RankItem[]>([]);
  readonly maxItems = input<number>(5);
  readonly valuePrefix = input<string>('');
  readonly valueSuffix = input<string>('');

  readonly listAriaLabel = computed(() => this.title() || 'Ranking');

  readonly visibleItems = computed<RankDisplayItem[]>(() => {
    const maxItems = Math.max(this.maxItems(), 0);
    const items = [...this.items()]
      .sort((left, right) => right.value - left.value)
      .slice(0, maxItems);
    const maxValue = items.reduce((max, item) => Math.max(max, item.value), 0);

    return items.map((item) => ({
      ...item,
      percent: maxValue > 0 ? (item.value / maxValue) * 100 : 0,
    }));
  });
}
