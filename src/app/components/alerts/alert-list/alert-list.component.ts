import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from "../alert/alert.component";

@Component({
  selector: 'app-alert-list',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  templateUrl: './alert-list.component.html',
})
export class AlertListComponent {
  @Input() alerts: any[] = [];
  @Output() alertsLoaded = new EventEmitter<any[]>();
  @Input() triggeredAlerts: any[] = [];

  /**
   * onAlertDeleted
   */
  onAlertDeleted(alertId: number) {
    this.alerts = this.alerts.filter(alert => alert.id !== alertId);
  }


  /**
   * Check if there are any triggered alerts and updates the corresponding alerts in the list.
   */
  ngOnChanges() {
    if (this.triggeredAlerts?.length) {
      for (const triggered of this.triggeredAlerts) {
        const alert = this.alerts.find(a => a.id === triggered.id);
        if (alert) {
          alert.active = triggered.active;
        }
      }
    }
  }
}
