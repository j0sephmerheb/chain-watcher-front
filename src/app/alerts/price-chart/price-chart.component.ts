import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-price-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './price-chart.component.html',
  styleUrl: './price-chart.component.scss'
})
export class PriceChartComponent implements OnChanges {
  @Input() prices: any[] = [];
  @Input() first: number = 0;
  @Input() last: number = 0;
  @Input() percentage: number = 0;
  @Input() direction: string = '';
  @Input() coin: string = '';

  chartSeries: any[] = [];
  tickIndex = 0;

  customColors = [
    {
      name: 'Price',
      value: '#3b82f6', 
    }
  ];

  formatXAxisTick = (val: string): string => {
    const result = this.tickIndex % 6 === 0 ? val : '';
    this.tickIndex++;
    return result;
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['prices'] && this.prices?.length) {
      this.chartSeries = [
        {
          name: 'Price',
          series: this.prices.map((entry: any) => ({
            name: entry.time,
            value: entry.price,
          })),
        },
      ];
    }
  }
}
