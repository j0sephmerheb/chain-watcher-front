import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-alert-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alert-form.component.html',
  styleUrl: './alert-form.component.scss'
})
export class AlertFormComponent {
  direction: 'up' | 'down' = 'up';
  percentage: number | null = null;

  private alertsService = inject(AlertsService);
  
  @Output() alertCreated = new EventEmitter<any>();

  onSubmit() {
    const selectedCoin = this.alertsService.getSelectedCoin();

    if (this.percentage !== null && this.percentage >= 0) {
      this.alertsService.createAlert({
        direction: this.direction,
        percentage: this.percentage,
        coin: selectedCoin
      }).subscribe((createdAlert) => {
        this.alertCreated.emit(createdAlert);
        this.direction = 'up';
        this.percentage = null;
      });
    }
  }
}
