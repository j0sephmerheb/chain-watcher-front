import { Component } from '@angular/core';
import { AlertListComponent } from './alert-list/alert-list.component';
import { AlertFormComponent } from './alert-form/alert-form.component';
import { PriceChartComponent } from './price-chart/price-chart.component';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [AlertListComponent, AlertFormComponent, PriceChartComponent],
  template: `
    <div class="p-4">
      <h1 class="text-xl font-bold mb-4">Alerts</h1>
      <app-alert-form></app-alert-form>
      <app-alert-list></app-alert-list>
      <app-price-chart></app-price-chart>
    </div>
  `,
})
export class AlertsComponent {}
