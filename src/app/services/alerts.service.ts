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

  /**
   * Observable for the selected coin
   */
  // This allows components to subscribe to changes in the selected coin
  selectedCoin$ = this.selectedCoinSubject.asObservable();
  
  /**
   * Sets the selected coin for alerts
   * @param coin
   */
  setSelectedCoin(coin: string) {
    this.selectedCoinSubject.next(coin);
  }

  /**
   * Gets all alerts
   * @returns
   */
  getSelectedCoin(): string {
    return this.selectedCoinSubject.getValue();
  }
  
  /**
   * Deletes an alert by its ID
   * @param id
   * @returns
   */
  deleteAlert(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  /**
    * Toggle alert active state
    * @param id 
    * @returns 
    */
  toggleAlert(id: number) {
    return this.http.patch(`${this.baseUrl}/${id}/toggle`, {});
  }

  /**
   * Creates a new alert
   * @param alert 
   * @returns 
   */
  createAlert(alert: any) {
    return this.http.post(this.baseUrl, alert);
  }

  /**
   * Gets all alerts for the selected coin
   * @param coin 
   * @returns
   */
  getAlertsByCoin(coin: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?coin=${coin}`);
  }
}
