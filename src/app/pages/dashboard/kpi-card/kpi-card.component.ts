import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {MatCard, MatCardContent, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatMiniFabButton} from '@angular/material/button';
import {TablerIconComponent} from 'angular-tabler-icons';

@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.component.html',
  imports: [
    MatCard,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatMiniFabButton,
    TablerIconComponent,
    DecimalPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiCardComponent {
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
  readonly value = input<number>(0);
  readonly valuePrefix = input<string>('');
  readonly valueSuffix = input<string>('');
  readonly valueFormat = input<string>('1.0-0');
  readonly change = input<number>(0);
  readonly changeFormat = input<string>('1.0-0');
  readonly changeLabel = input<string>('');
  readonly trendAriaLabel = input<string>('Tendencia do indicador');

  readonly absChange = computed(() => Math.abs(this.change()));
}
