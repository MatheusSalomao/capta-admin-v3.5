import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RankCardComponent, RankItem } from './rank-card/rank-card.component';

@Component({
  selector: 'app-registrations-ranking',
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
export class RegistrationsRankingComponent {
  readonly title = 'Top matrículas';
  readonly subtitle = 'Matrículas mais demandadas últimos 7 dias';
  readonly maxItems = 5;
  readonly valueSuffix = ' matrículas';
  readonly items = input<RankItem[]>([]);
}
