import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PricesService {
  constructor(private http: HttpClient) {}

  getPriceData(coin: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/prices/${coin}`);
  }
}
