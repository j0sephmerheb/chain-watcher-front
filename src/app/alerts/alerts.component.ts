// alerts.component.ts
import { Component, inject } from "@angular/core";
import { AlertListComponent } from "./alert-list/alert-list.component";
import { AlertFormComponent } from "./alert-form/alert-form.component";
import { AlertsService } from "../services/alerts.service";
import { PriceChartComponent } from "./price-chart/price-chart.component";
import { PricesService } from "../services/prices.service";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

@Component({
  selector: "app-alerts",
  standalone: true,
  imports: [
    AlertListComponent,
    AlertFormComponent,
    PriceChartComponent,
    MatSnackBarModule,
  ],
  templateUrl: "./alerts.component.html",
})
export class AlertsComponent {
  alerts: any[] = [];
  triggeredAlerts: any[] = [];
  selectedCoin = "ethereum"; // default
  chartData: any = null;
  private refreshIntervalId: any;

  private alertsService = inject(AlertsService);
  private pricesService = inject(PricesService);
  private snackBar = inject(MatSnackBar);

  ngOnInit() {
    this.loadDataForCoin(this.selectedCoin);

    this.refreshIntervalId = setInterval(() => {
      this.loadDataForCoin(this.selectedCoin);
    }, 300000); // 5 minutes
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

  loadDataForCoin(coin: string) {
    this.pricesService.getPriceData(coin).subscribe((data: any) => {
      this.chartData = data;

      // Update alerts with backend response
      this.alerts = data.alertResult?.allAlerts || this.alerts;

      // If triggeredAlerts exist, update matching alerts
      const triggered = data.alertResult?.triggeredAlerts || [];
      for (const trig of triggered) {
        const found = this.alerts.find((a) => a.id === trig.id);
        if (found) {
          found.active = trig.active;
        }
      }

      if (triggered.length) {
        this.snackBar.open("Alerts triggered!", "Close", {
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "center",
        });
      }
    });
  }

  ngOnDestroy() {
    clearInterval(this.refreshIntervalId);
  }
}
