// alerts.component.ts
import { Component, inject } from '@angular/core';
import { AlertListComponent } from './alert-list/alert-list.component';
import { AlertFormComponent } from './alert-form/alert-form.component';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertsService } from '../services/alerts.service';
import { PriceChartComponent } from './price-chart/price-chart.component';
import { PricesService } from '../services/prices.service';


@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [AlertListComponent, AlertFormComponent, PriceChartComponent],
  templateUrl: './alerts.component.html',
})
export class AlertsComponent {
  alerts: any[] = [];
  selectedCoin = 'bitcoin'; // default
  chartData: any = null;

  private alertsService = inject(AlertsService);
  private pricesService = inject(PricesService);

  ngOnInit() {
    this.loadDataForCoin(this.selectedCoin);
  }

  onAlertCreated(newAlert: any) {
    this.alerts = [newAlert, ...this.alerts];
  }

  onAlertsLoaded(allAlerts: any[]) {
    this.alerts = allAlerts;
  }

  onCoinChange(event: Event) {
    const coin = (event.target as HTMLSelectElement).value;
    this.selectedCoin = coin;
    this.alertsService.setSelectedCoin(coin);
    this.loadDataForCoin(coin);
  }

  loadAlertsForCoin(coin: string) {
    this.alertsService.getAlertsByCoin(coin).subscribe((data: any[]) => {
      this.alerts = data;
    });
  }

  loadDataForCoin(coin: string) {
    this.loadAlertsForCoin(coin);
    this.loadChartForCoin(coin);
  }

  loadChartForCoin(coin: string) {
    this.pricesService.getPriceData(coin).subscribe((data: any) => {
      this.chartData = data;
    });
  }
}

