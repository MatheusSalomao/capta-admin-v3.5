import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {MatCard, MatCardContent, MatCardSubtitle, MatCardTitle} from '@angular/material/card';

export interface FunnelStage {
  key: string;
  label: string;
  value: number;
  description?: string;
}

interface FunnelDisplayStage extends FunnelStage {
  percentOfBase: number;
  percentOfPrevious: number;
}

@Component({
  selector: 'app-funnel-card',
  templateUrl: './funnel-card.component.html',
  imports: [MatCard, MatCardContent, MatCardSubtitle, MatCardTitle, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FunnelCardComponent {
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
  readonly stages = input<FunnelStage[]>([]);
  readonly valuePrefix = input<string>('');
  readonly valueSuffix = input<string>('');

  readonly listAriaLabel = computed(() => this.title() || 'Funil');

  readonly displayStages = computed<FunnelDisplayStage[]>(() => {
    const stages = this.stages();
    const baseValue = stages.length ? stages[0].value : 0;
    let previousValue = baseValue;

    return stages.map((stage, index) => {
      const percentOfBase = baseValue > 0 ? (stage.value / baseValue) * 100 : 0;
      const percentOfPrevious = index === 0 ? 100 : previousValue > 0 ? (stage.value / previousValue) * 100 : 0;

      previousValue = stage.value;

      return {
        ...stage,
        percentOfBase,
        percentOfPrevious,
      };
    });
  });
}
