import { Routes } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';

export const routes: Routes = [
  { path: 'alerts', component: AlertsComponent },
  { path: '', redirectTo: 'alerts', pathMatch: 'full' },
];
