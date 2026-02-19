import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexMarkers,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexTooltip,
  ChartComponent,
} from 'ng-apexcharts';
import { MatCard, MatCardContent, MatCardSubtitle } from '@angular/material/card';
import { MatMiniFabButton } from '@angular/material/button';
import { TablerIconComponent } from 'angular-tabler-icons';
import { DecimalPipe } from '@angular/common';
import { CounterComponent } from './counter.component';

interface WeeklyMetricChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  fill: ApexFill;
  markers: ApexMarkers;
  responsive: ApexResponsive[];
  colors: string[];
}

@Component({
  selector: 'app-weekly-metric-card',
  templateUrl: './weekly-metric-card.component.html',
  imports: [
    ChartComponent,
    MatCard,
    MatCardSubtitle,
    MatCardContent,
    TablerIconComponent,
    MatMiniFabButton,
    CounterComponent,
    DecimalPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeeklyMetricCardComponent {
  readonly title = input<string>('');
  readonly series = input<number[]>([]);
  readonly seriesName = input<string>('');
  readonly seriesColor = input<string>('var(--chart-series-1)');
  readonly trendAriaLabel = input<string>('Variacao semanal');
  readonly variationLabel = input<string>('');
  readonly changeFormat = input<string>('1.0-0');

  readonly sum = computed<number>(() => this.series().reduce((a, b) => a + b, 0));
  readonly variation = computed<number>(() => {
    const values = this.series();
    const len = values.length;
    const last = len > 0 ? values[len - 1] : 0;
    const prev = len > 1 ? values[len - 2] : 0;

    if (len < 2 || !Number.isFinite(last) || !Number.isFinite(prev)) {
      return 0;
    }
    //
    // if (prev === 0) {
    //   return last === 0 ? 0 : 100;
    // }

    return Number.parseFloat((((last - prev) / prev) * 100).toFixed(1));
  });

  readonly chart = computed<WeeklyMetricChart>(() => ({
    chart: {
      id: 'sparkline3',
      type: 'area',
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
      fontFamily: 'inherit',
      foreColor: '#adb0bb',
    },
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        name: this.seriesName(),
        color: this.seriesColor(),
        data: this.series(),
      },
    ],
    colors: [this.seriesColor()],
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    legend: {
      show: false,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0.15,
        opacityTo: 0,
        stops: [20, 180],
      },
      opacity: 0.5,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: true,
        position: 'right',
      },
      x: {
        show: false,
      },
    },
    plotOptions: {},
    responsive: [],
  }));
}
