// alert-list.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AlertComponent } from "../alert/alert.component";

@Component({
  selector: 'app-alert-list',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  templateUrl: './alert-list.component.html',
})
export class AlertListComponent {
  http = inject(HttpClient);
  alerts: any[] = [];

  onAlertDeleted(alertId: number) {
    this.alerts = this.alerts.filter(alert => alert.id !== alertId);
  }
  
  ngOnInit() {
    this.http.get(`${environment.apiUrl}/alerts`).subscribe((data: any) => {
      this.alerts = data;
    });
  }
}
