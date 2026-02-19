import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FunnelCardComponent, FunnelStage } from './funnel-card/funnel-card.component';

@Component({
  selector: 'app-conversion-funnel',
  template: `
    <app-funnel-card
      [title]="title"
      [subtitle]="subtitle"
      [stages]="stages()"
    />
  `,
  imports: [FunnelCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversionFunnelComponent {
  readonly title = 'Funil de conversão';
  readonly subtitle = 'Etapas de interesse até matricula';

  readonly stages = signal<FunnelStage[]>([
    {key: 'interesse', label: 'Interesse', value: 12400},
    {key: 'inscricao', label: 'Inscricao', value: 2280},
    {key: 'pagamento', label: 'Pagamento', value: 1490},
    {key: 'matricula', label: 'Matricula', value: 980},
  ]);
}
