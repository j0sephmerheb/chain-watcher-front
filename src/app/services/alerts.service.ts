// alerts.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/alerts`;
  private selectedCoinSubject = new BehaviorSubject<string>('ethereum');
  selectedCoin$ = this.selectedCoinSubject.asObservable();
  
  setSelectedCoin(coin: string) {
    this.selectedCoinSubject.next(coin);
  }

  getSelectedCoin(): string {
    return this.selectedCoinSubject.getValue();
  }
  
  deleteAlert(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  toggleAlert(id: number) {
    return this.http.patch(`${this.baseUrl}/${id}/toggle`, {});
  }

  createAlert(alert: any) {
    return this.http.post(this.baseUrl, alert);
  }

  getAlertsByCoin(coin: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?coin=${coin}`);
  }
}
