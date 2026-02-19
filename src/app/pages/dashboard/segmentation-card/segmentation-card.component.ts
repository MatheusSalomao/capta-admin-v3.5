import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexTooltip,
  ChartComponent
} from 'ng-apexcharts';
import {MatCard, MatCardContent, MatCardSubtitle, MatCardTitle} from '@angular/material/card';

interface SegmentationChart {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  labels: string[];
  colors: string[];
}

@Component({
  selector: 'app-segmentation-card',
  templateUrl: './segmentation-card.component.html',
  imports: [ChartComponent, MatCard, MatCardContent, MatCardSubtitle, MatCardTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentationCardComponent {
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
  readonly series = input<number[]>([]);
  readonly labels = input<string[]>([]);
  readonly colors = input<string[]>([]);

  readonly chart = computed<SegmentationChart>(() => ({
    series: this.series(),
    labels: this.labels(),
    colors: this.colors(),
    chart: {
      height: 265,
      type: 'donut',
      fontFamily: 'inherit',
      foreColor: '#adb0bb',
    },
    stroke: {
      show: true,
      colors: ['var(--mat-sys-outline-variant)'],
      width: 0,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '80%',
          labels: {
            show: true,
            value: {
              show: true,
              formatter: function (val: string) {
                return `${Number.parseFloat(val).toFixed(2)}%`;
              },
            },
            total: {
              show: true,
              label: 'Total',
              formatter: function (w: { globals: { seriesTotals: number[] } }) {
                return `${w.globals.seriesTotals.reduce((a, b) => a + b, 0).toFixed(0)}%`;
              },
            },
          },
        },
      },
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
      y: {
        formatter: function (val: number) {
          return `${val.toFixed(2)}%`;
        },
      },
    },
    responsive: [],
  }));
}
