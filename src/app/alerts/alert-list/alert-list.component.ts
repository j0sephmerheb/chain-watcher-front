// alert-list.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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

  onAlertDeleted(alertId: number) {
    this.alerts = this.alerts.filter(alert => alert.id !== alertId);
  }
}
