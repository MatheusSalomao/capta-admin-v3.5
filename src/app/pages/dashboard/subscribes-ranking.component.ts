import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RankCardComponent, RankItem } from './rank-card/rank-card.component';

@Component({
  selector: 'app-subscribes-ranking',
  template: `
    <app-rank-card
      [title]="title"
      [subtitle]="subtitle"
      [items]="items()"
      [maxItems]="maxItems"
      [valueSuffix]="valueSuffix"
    ></app-rank-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RankCardComponent
  ]
})
export class SubscribesRankingComponent {
  readonly title = 'Top inscrições';
  readonly subtitle = 'Incrições mais demandados últimos 7 dias';
  readonly maxItems = 5;
  readonly valueSuffix = ' inscrições';
  readonly items = input<RankItem[]>([]);
}
