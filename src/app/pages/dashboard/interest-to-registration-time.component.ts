import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { KpiCardComponent } from './kpi-card/kpi-card.component';

@Component({
  selector: 'app-interest-to-registration-time',
  template: `
    <app-kpi-card
      [title]="title"
      [subtitle]="subtitle"
      [value]="value()"
      [valueSuffix]="valueSuffix"
      [valueFormat]="valueFormat"
      [change]="change()"
      [changeFormat]="changeFormat"
      [changeLabel]="changeLabel"
      [trendAriaLabel]="trendAriaLabel" />
  `,
  imports: [KpiCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterestToRegistrationTimeComponent {
  readonly title = 'Tempo medio até matrícula';
  readonly subtitle = 'Dias entre interesse e matrícula';
  readonly valueSuffix = ' dias';
  readonly valueFormat = '1.0-1';
  readonly changeFormat = '1.0-1';
  readonly changeLabel = 'vs semana anterior';
  readonly trendAriaLabel = 'Tendencia do tempo medio';

  readonly series = input<number[]>([]);

  readonly value = computed(() => {
    const values = this.series();
    return values.length ? values[values.length - 1] : 0;
  });

  readonly change = computed(() => {
    const values = this.series();
    const len = values.length;
    const last = len > 0 ? values[len - 1] : 0;
    const prev = len > 1 ? values[len - 2] : 0;

    if (len < 2 || !Number.isFinite(last) || !Number.isFinite(prev)) {
      return 0;
    }

    if (prev === 0) {
      return last === 0 ? 0 : 100;
    }

    return Number.parseFloat((((last - prev) / prev) * 100).toFixed(1));
  });
}
