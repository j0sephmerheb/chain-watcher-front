// alerts.component.ts
import { Component, inject } from '@angular/core';
import { AlertListComponent } from './alert-list/alert-list.component';
import { AlertFormComponent } from './alert-form/alert-form.component';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertsService } from '../services/alerts.service';


@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [AlertListComponent, AlertFormComponent],
  templateUrl: './alerts.component.html',
})
export class AlertsComponent {
  alerts: any[] = [];
  selectedCoin = 'bitcoin'; // default

  private alertsService = inject(AlertsService);

  ngOnInit() {
    this.loadAlertsForCoin(this.selectedCoin);
  }

  onAlertCreated(newAlert: any) {
    this.alerts = [newAlert, ...this.alerts];
  }

  onAlertsLoaded(allAlerts: any[]) {
    this.alerts = allAlerts;
  }

  onCoinChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedCoin = value;
    this.alertsService.setSelectedCoin(value);
    this.loadAlertsForCoin(value);
  }

  loadAlertsForCoin(coin: string) {
    this.alertsService.getAlertsByCoin(coin).subscribe((data: any[]) => {
      this.alerts = data;
    });
  }
}

