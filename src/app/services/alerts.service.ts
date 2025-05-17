// alerts.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor(private http: HttpClient) {}

  deleteAlert(id: number) {
    return this.http.delete(`${environment.apiUrl}/alerts/${id}`);
  }

  toggleAlert(id: number) {
    return this.http.patch(`${environment.apiUrl}/alerts/${id}/toggle`, {});
  }
}
