import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class PricesService {
  constructor(private http: HttpClient) {}

  getPrices(coin: string) {
    return this.http.get(`${environment.apiUrl}/prices/${coin}`);
  }
}
