// alert-list.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-alert-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-list.component.html',
})
export class AlertListComponent {
  http = inject(HttpClient);
  alerts: any[] = [];

  ngOnInit() {
    this.http.get(`${environment.apiUrl}/alerts`).subscribe((data: any) => {
      this.alerts = data;
    });
  }
}
